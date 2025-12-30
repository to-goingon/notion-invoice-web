import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/session";

/**
 * POST /api/auth/logout
 * Destroy session and remove cookie
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: "로그아웃 성공",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "서버 오류가 발생했습니다",
      },
      { status: 500 }
    );
  }
}
