export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="absolute left-8 top-8">
        <h1 className="text-2xl font-bold">Notion Invoice</h1>
      </div>
      <main className="w-full max-w-md px-4">{children}</main>
    </div>
  );
}
