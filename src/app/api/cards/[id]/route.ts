import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";
import { CardData } from "@/lib/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const db = getDb();
  const row = db.prepare("SELECT * FROM cards WHERE id = ?").get(params.id) as
    | {
        id: string;
        user_id: string;
        photo_url: string | null;
        template: string;
        text_config: string;
        animated: number;
        format: string;
        created_at: string;
      }
    | undefined;

  if (!row) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const card: CardData = {
    id: row.id,
    userId: row.user_id,
    photoUrl: row.photo_url,
    template: row.template,
    animated: !!row.animated,
    format: (row.format as "landscape" | "portrait") || "landscape",
    textConfig: JSON.parse(row.text_config),
    createdAt: row.created_at,
  };

  return NextResponse.json(card);
}
