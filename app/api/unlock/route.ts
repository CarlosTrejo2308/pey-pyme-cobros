import { NextRequest, NextResponse } from "next/server";
import {
  DEMO_COOKIE,
  demoCookieOptions,
  getExpectedDemoToken,
} from "@/lib/auth";
import { jsonError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  const expected = getExpectedDemoToken();
  if (!expected) {
    return jsonError(500, "INTERNAL", "DEMO_ACCESS_TOKEN is not configured");
  }

  let token = "";
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { token?: unknown };
      token = typeof body.token === "string" ? body.token : "";
    } catch {
      return jsonError(400, "VALIDATION", "Invalid JSON body");
    }
  } else {
    const form = await request.formData();
    const value = form.get("token");
    token = typeof value === "string" ? value : "";
  }

  if (token !== expected) {
    return jsonError(401, "UNAUTHORIZED", "Invalid demo access token");
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEMO_COOKIE, expected, demoCookieOptions());
  return res;
}
