import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { CardData, defaultPhotoTransform } from "@/lib/types";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id || null;

  const body = await req.json();
  const id = uuid();

  const db = getDb();
  db.prepare(
    "INSERT INTO cards (id, user_id, photo_url, template, text_config, animated, format, photo_transform) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    id,
    userId,
    body.photoUrl || null,
    body.template || "gradient-sunset",
    JSON.stringify(body.textConfig || {}),
    body.animated ? 1 : 0,
    body.format === "portrait" ? "portrait" : "landscape",
    JSON.stringify(body.photoTransform || defaultPhotoTransform),
  );

  return NextResponse.json({ id }, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string })?.id;

  if (!userId) {
    return NextResponse.json({ error: "not logged in" }, { status: 401 });
  }

  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM cards WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as Array<{
    id: string;
    user_id: string;
    photo_url: string | null;
    template: string;
    text_config: string;
    animated: number;
    format: string;
    photo_transform: string;
    created_at: string;
  }>;

  const cards: CardData[] = rows.map((r) => ({
    id: r.id,
    userId: r.user_id,
    photoUrl: r.photo_url,
    template: r.template,
    animated: !!r.animated,
    format: (r.format as "landscape" | "portrait") || "landscape",
    textConfig: JSON.parse(r.text_config),
    photoTransform: r.photo_transform ? JSON.parse(r.photo_transform) : defaultPhotoTransform,
    createdAt: r.created_at,
  }));

  return NextResponse.json(cards);
}
