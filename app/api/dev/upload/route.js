// Dev-only media upload. Writes into public/media/<folder> with a collision-safe,
// convention-matching filename. 404 in production.
import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isDev = process.env.NODE_ENV !== "production";
const MEDIA_DIR = path.join(process.cwd(), "public", "media");
const FOLDERS = ["ai", "space", "xr", "robotics", "physics", "education", "music", "activism", "personal"];
const EXT = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;
const MAX_BYTES = 80 * 1024 * 1024; // 80 MB
const notFound = () => new NextResponse("Not found", { status: 404 });

function nameParts(original) {
  const dot = original.lastIndexOf(".");
  const ext = (dot >= 0 ? original.slice(dot) : "").toLowerCase();
  const base =
    (dot > 0 ? original.slice(0, dot) : original)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "media";
  return { base, ext };
}

export async function POST(req) {
  if (!isDev) return notFound();

  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const folder = form.get("folder");
  const file = form.get("file");
  if (!FOLDERS.includes(folder)) return NextResponse.json({ error: "Unknown folder" }, { status: 400 });
  if (!file || typeof file === "string") return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!EXT.test(file.name || "")) return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) return NextResponse.json({ error: "File exceeds 80 MB" }, { status: 400 });

  const { base, ext } = nameParts(file.name);
  const dir = path.join(MEDIA_DIR, folder);
  await fs.mkdir(dir, { recursive: true });

  let filename = `${folder}__${base}${ext}`;
  let n = 2;
  // Never overwrite an existing asset.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await fs.access(path.join(dir, filename));
      filename = `${folder}__${base}-${n}${ext}`;
      n += 1;
    } catch {
      break;
    }
  }

  try {
    await fs.writeFile(path.join(dir, filename), buf);
  } catch (e) {
    return NextResponse.json({ error: "Write failed: " + e.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, src: `/media/${folder}/${filename}`, folder, name: filename });
}
