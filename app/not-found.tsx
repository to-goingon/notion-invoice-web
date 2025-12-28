import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4 text-center">
        <FileQuestion className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <h2 className="mt-2 text-2xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted-foreground max-w-md">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/">
            <Button size="lg">홈으로 이동</Button>
          </Link>
          <Link href="/invoices">
            <Button size="lg" variant="outline">
              인보이스 목록
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
