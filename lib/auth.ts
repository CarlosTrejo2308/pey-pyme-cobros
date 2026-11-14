import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const DEMO_COOKIE = "demo_token";

export function getExpectedDemoToken(): string | undefined {
  const token = process.env.DEMO_ACCESS_TOKEN;
  return token && token.length > 0 ? token : undefined;
}

export function isAuthorizedRequest(request: NextRequest): boolean {
  const expected = getExpectedDemoToken();
  if (!expected) return false;

  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    const bearer = header.slice("Bearer ".length).trim();
    if (bearer === expected) return true;
  }

  const cookie = request.cookies.get(DEMO_COOKIE)?.value;
  return cookie === expected;
}

export function unauthorizedResponse(): NextResponse {
  return NextResponse.json(
    {
      error: {
        code: "UNAUTHORIZED",
        message: "Missing or invalid demo access token",
      },
    },
    { status: 401 },
  );
}

export function demoCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
