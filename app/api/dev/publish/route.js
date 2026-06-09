// Dev-only publish: commits content.json + uploaded media and pushes the current branch so
// Vercel redeploys. Uses execFile (no shell) to avoid quoting/injection issues. 404 in prod.
import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const exec = promisify(execFile);
const isDev = process.env.NODE_ENV !== "production";
const notFound = () => new NextResponse("Not found", { status: 404 });

async function git(args) {
  try {
    const { stdout, stderr } = await exec("git", args, { cwd: process.cwd(), maxBuffer: 16 * 1024 * 1024 });
    return { step: args[0], ok: true, code: 0, stdout: stdout || "", stderr: stderr || "" };
  } catch (e) {
    return { step: args[0], ok: false, code: e.code ?? 1, stdout: e.stdout || "", stderr: e.stderr || e.message };
  }
}

export async function POST(req) {
  if (!isDev) return notFound();

  let message = "content: visual editor update";
  try {
    const body = await req.json();
    if (body?.message) message = String(body.message).slice(0, 200);
  } catch {}

  const steps = [];
  const fail = (status = 500) => NextResponse.json({ ok: false, branch, steps }, { status });

  const branchRes = await git(["rev-parse", "--abbrev-ref", "HEAD"]);
  steps.push(branchRes);
  const branch = (branchRes.stdout || "").trim() || "HEAD";
  if (!branchRes.ok) return fail();

  const add = await git(["add", "app/_data/content.json", "public/media"]);
  steps.push(add);
  if (!add.ok) return fail();

  // `diff --cached --quiet` exits 0 when nothing is staged, 1 when there are staged changes.
  const staged = await git(["diff", "--cached", "--quiet"]);
  if (staged.ok) {
    return NextResponse.json({ ok: true, branch, nothingToCommit: true, steps });
  }

  const commit = await git(["commit", "-m", message]);
  steps.push(commit);
  if (!commit.ok) return fail();

  const push = await git(["push", "origin", branch]);
  steps.push(push);
  if (!push.ok) return fail();

  return NextResponse.json({ ok: true, branch, steps });
}
