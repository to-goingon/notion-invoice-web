/**
 * Authentication types for the Notion Invoice Manager
 * Provides type definitions for admin authentication system
 */

/**
 * Administrator user interface
 */
export interface User {
  id: string;
  username: string;
  role: "admin";
}

/**
 * Session information interface
 */
export interface Session {
  user: User;
  expires_at: number; // Unix timestamp in milliseconds
  created_at: number; // Unix timestamp in milliseconds
}

/**
 * Login credentials type
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

/**
 * Authentication state type (discriminated union)
 * Ensures type safety when checking authentication status
 */
export type AuthState =
  | { isAuthenticated: true; user: User; session: Session }
  | { isAuthenticated: false; user: null; session: null };

/**
 * Authentication context interface for React Context API
 */
export interface AuthContext {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

/**
 * Login API response type
 */
export interface LoginResponse {
  success: boolean;
  user?: User;
  session?: Session;
  error?: string;
  message?: string;
}

/**
 * Session validation API response type
 */
export interface SessionResponse {
  success: boolean;
  session?: Session;
  error?: string;
}
