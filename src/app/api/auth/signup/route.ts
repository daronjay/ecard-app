import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import getDb from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "email and password (6+ chars) required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(email);

  if (existing) {
    return NextResponse.json({ error: "email taken" }, { status: 409 });
  }

  const id = uuid();
  const passwordHash = await hash(password, 10);

  db.prepare("INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)").run(
    id,
    email,
    passwordHash
  );

  return NextResponse.json({ id, email }, { status: 201 });
}
