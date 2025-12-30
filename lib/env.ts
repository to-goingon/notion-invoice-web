import { z } from "zod";

/**
 * Environment variable validation schema
 * This ensures all required environment variables are set
 */
const envSchema = z.object({
  NOTION_API_KEY: z
    .string()
    .min(1, "NOTION_API_KEY is required")
    .describe("Notion Integration API key"),
  NOTION_DATABASE_ID: z
    .string()
    .min(1, "NOTION_DATABASE_ID is required")
    .regex(/^[a-f0-9]{32}$/, "NOTION_DATABASE_ID must be a valid 32-char hex ID")
    .describe("Notion database ID for invoices"),
  NOTION_ITEMS_DATABASE_ID: z
    .string()
    .min(1, "NOTION_ITEMS_DATABASE_ID is required")
    .regex(/^[a-f0-9]{32}$/, "NOTION_ITEMS_DATABASE_ID must be a valid 32-char hex ID")
    .describe("Notion database ID for invoice items"),
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .default("")
    .describe("Application base URL (auto-detected from VERCEL_URL)"),

  // Administrator authentication (Phase 1 - 고도화)
  ADMIN_USERNAME: z
    .string()
    .min(3, "ADMIN_USERNAME must be at least 3 characters")
    .describe("Administrator username for login"),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "ADMIN_PASSWORD must be at least 8 characters")
    .describe("Administrator password for login"),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters for security")
    .describe("Secret key for session encryption and signing"),
});

/**
 * Validated environment variables
 * This will throw an error if validation fails
 */
export const env = envSchema.parse({
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ITEMS_DATABASE_ID: process.env.NOTION_ITEMS_DATABASE_ID,
  NEXT_PUBLIC_BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000",

  // Administrator authentication
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
});

export type Env = z.infer<typeof envSchema>;
