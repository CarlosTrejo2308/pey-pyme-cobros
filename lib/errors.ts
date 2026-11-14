import { NextResponse } from "next/server";

export function jsonError(
  status: number,
  code: string,
  message: string,
  detail?: string,
): NextResponse {
  return NextResponse.json(
    { error: { code, message, ...(detail !== undefined ? { detail } : {}) } },
    { status },
  );
}
