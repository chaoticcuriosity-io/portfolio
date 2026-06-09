// Dev-only media listing for the editor's media library. 404 in production.
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isDev = process.env.NODE_ENV !== "production";
const MEDIA_DIR = path.join(process.cwd(), "public", "media");
export const FOLDERS = ["ai", "space", "xr", "robotics", "physics", "education", "music", "activism", "personal"];
const EXT = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;
const notFound = () => new NextResponse("Not found", { status: 404 });

export async function GET(req) {
  if (!isDev) return notFound();
  const folderParam = new URL(req.url).searchParams.get("folder");
  const folders = folderParam ? [folderParam] : FOLDERS;
  if (folders.some((f) => !FOLDERS.includes(f))) {
    return NextResponse.json({ error: "Unknown folder" }, { status: 400 });
  }

  const items = [];
  for (const f of folders) {
    let names = [];
    try {
      names = await fs.readdir(path.join(MEDIA_DIR, f));
    } catch {
      continue;
    }
    for (const name of names) {
      if (!EXT.test(name)) continue;
      items.push({ src: `/media/${f}/${name}`, folder: f, name, video: VIDEO.test(name) });
    }
  }
  items.sort((a, b) => a.src.localeCompare(b.src));
  return NextResponse.json({ folders: FOLDERS, items });
}
