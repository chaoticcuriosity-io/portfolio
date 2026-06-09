// Dev-only content persistence. Returns 404 in production so the deployed Vercel site never
// exposes a filesystem writer. Writes app/_data/content.json atomically (temp + rename).
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isDev = process.env.NODE_ENV !== "production";
const FILE = path.join(process.cwd(), "app", "_data", "content.json");
const notFound = () => new NextResponse("Not found", { status: 404 });

export async function GET() {
  if (!isDev) return notFound();
  try {
    const data = await fs.readFile(FILE, "utf8");
    return new NextResponse(data, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  if (!isDev) return notFound();

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Shape guard — refuse anything that isn't recognisably the site content object.
  if (!body || typeof body !== "object" || !body.profile || !body.home || !body.domainsData) {
    return NextResponse.json({ error: "Missing required top-level keys (profile/home/domainsData)" }, { status: 400 });
  }

  const json = JSON.stringify(body, null, 2) + "\n";
  const tmp = path.join(path.dirname(FILE), ".content.json.tmp");
  try {
    await fs.writeFile(tmp, json, "utf8");
    await fs.rename(tmp, FILE);
  } catch (e) {
    return NextResponse.json({ error: "Write failed: " + e.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, bytes: json.length });
}
