"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console for debugging
    console.error("Invoice list error:", error);
  }, [error]);

  // User-friendly error message based on error type
  const getUserMessage = () => {
    const errorMsg = error.message?.toLowerCase() || "";

    if (errorMsg.includes("notion") || errorMsg.includes("api")) {
      return "Notion API에 연결할 수 없습니다. 인증 정보를 확인해주세요.";
    }
    if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
      return "네트워크 연결을 확인해주세요.";
    }
    if (errorMsg.includes("timeout")) {
      return "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
    }
    return "데이터를 불러오는 중 오류가 발생했습니다.";
  };

  return (
    <div className="container flex min-h-[400px] flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center space-y-4 text-center">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold">문제가 발생했습니다</h1>
        <p className="text-muted-foreground max-w-md text-lg">
          {getUserMessage()}
        </p>

        <div className="mt-8 flex gap-4">
          <Button onClick={() => reset()}>다시 시도</Button>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && error.message && (
          <details className="mt-8 max-w-2xl">
            <summary className="cursor-pointer text-sm text-muted-foreground">
              개발자 정보 보기
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-left text-xs">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
