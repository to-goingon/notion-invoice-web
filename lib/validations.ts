import { z } from "zod";

// Invoice search form validation schema
export const invoiceSearchSchema = z.object({
  query: z.string().optional(),
});

export type InvoiceSearchFormData = z.infer<typeof invoiceSearchSchema>;

// Login form validation schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "사용자명을 입력해주세요")
    .min(3, "사용자명은 최소 3자 이상이어야 합니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
