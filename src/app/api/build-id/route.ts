import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export function GET() {
  const id = process.env.BUILD_ID ?? "dev";
  return NextResponse.json({ id }, { headers: { "Cache-Control": "no-store" } });
}
