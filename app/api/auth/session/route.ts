import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession, SESSION_COOKIE_NAME } from "@/lib/session";
import type { SessionResponse } from "@/types/auth";

/**
 * GET /api/auth/session
 * Verify and return current session
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      const response: SessionResponse = {
        success: false,
        error: "세션이 존재하지 않습니다",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Decrypt and validate session
    const session = await decryptSession(token);

    if (!session) {
      const response: SessionResponse = {
        success: false,
        error: "세션이 유효하지 않거나 만료되었습니다",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Return valid session
    const response: SessionResponse = {
      success: true,
      session,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Session verification error:", error);
    const response: SessionResponse = {
      success: false,
      error: "서버 오류가 발생했습니다",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
