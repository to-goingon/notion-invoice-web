import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";
import type { Session, User } from "@/types/auth";

/**
 * Session configuration
 */
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get secret key for JWT encryption
 */
function getSecretKey(): Uint8Array {
  return new TextEncoder().encode(env.SESSION_SECRET);
}

/**
 * Create a new session for the given user
 */
export function createSession(user: User): Session {
  const now = Date.now();
  return {
    user,
    created_at: now,
    expires_at: now + SESSION_DURATION,
  };
}

/**
 * Encrypt session data into a JWT token
 */
export async function encryptSession(session: Session): Promise<string> {
  const token = await new SignJWT({
    user: session.user,
    created_at: session.created_at,
    expires_at: session.expires_at,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(new Date(session.expires_at))
    .sign(getSecretKey());

  return token;
}

/**
 * Decrypt and verify a JWT token into session data
 */
export async function decryptSession(
  token: string
): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });

    const session: Session = {
      user: payload.user as User,
      created_at: payload.created_at as number,
      expires_at: payload.expires_at as number,
    };

    // Check if session is expired
    if (isSessionExpired(session)) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Check if a session has expired
 */
export function isSessionExpired(session: Session): boolean {
  return Date.now() > session.expires_at;
}

/**
 * Cookie configuration for session management
 */
export const SESSION_COOKIE_NAME = "session";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: SESSION_DURATION / 1000, // Convert to seconds
  path: "/",
};
