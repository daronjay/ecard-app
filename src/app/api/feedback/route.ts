import { NextRequest, NextResponse } from "next/server";

const LABEL_MAP: Record<string, string> = {
  bug: "bug",
  enhancement: "enhancement",
  feedback: "feedback",
};

export async function POST(req: NextRequest) {
  const { category, description } = await req.json();

  if (!description?.trim()) {
    return NextResponse.json({ error: "description required" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  if (!token || !owner || !repo) {
    return NextResponse.json({ error: "github not configured" }, { status: 500 });
  }

  const label = LABEL_MAP[category] ?? "feedback";
  const title = description.split("\n")[0].slice(0, 80) || "Feedback";

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: description,
      labels: [label],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("github issues api error:", err);
    return NextResponse.json({ error: "failed to create issue" }, { status: 500 });
  }

  const issue = await res.json();
  return NextResponse.json({ url: issue.html_url, number: issue.number });
}
