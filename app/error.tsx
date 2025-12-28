"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error tracking service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-4 text-center">
            <AlertTriangle className="h-20 w-20 text-destructive" />
            <h1 className="text-4xl font-bold">앗, 문제가 발생했습니다</h1>
            <p className="text-muted-foreground max-w-md text-lg">
              예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>

            <div className="mt-8 flex gap-4">
              <Button size="lg" onClick={() => reset()}>
                다시 시도
              </Button>
              <Link href="/">
                <Button size="lg" variant="outline">
                  홈으로 이동
                </Button>
              </Link>
            </div>

            {process.env.NODE_ENV === "development" && error.message && (
              <details className="mt-8 max-w-2xl">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  개발자 정보 보기
                </summary>
                <pre className="mt-2 overflow-auto rounded-lg bg-muted p-4 text-left text-xs">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
