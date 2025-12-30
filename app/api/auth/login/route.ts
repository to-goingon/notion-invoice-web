import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import {
  createSession,
  encryptSession,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/session";
import type { LoginCredentials, LoginResponse, User } from "@/types/auth";

/**
 * POST /api/auth/login
 * Authenticate user and create session
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginCredentials;

    // Validate credentials
    if (
      body.username !== env.ADMIN_USERNAME ||
      body.password !== env.ADMIN_PASSWORD
    ) {
      const response: LoginResponse = {
        success: false,
        error: "사용자명 또는 비밀번호가 올바르지 않습니다",
      };
      return NextResponse.json(response, { status: 401 });
    }

    // Create user object
    const user: User = {
      id: "admin",
      username: env.ADMIN_USERNAME,
      role: "admin",
    };

    // Create session
    const session = createSession(user);

    // Encrypt session into JWT token
    const token = await encryptSession(session);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

    // Return success response
    const response: LoginResponse = {
      success: true,
      user,
      session,
      message: "로그인 성공",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Login error:", error);
    const response: LoginResponse = {
      success: false,
      error: "서버 오류가 발생했습니다",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
