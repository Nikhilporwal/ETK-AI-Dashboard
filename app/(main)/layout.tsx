import { MainHeader } from "@/components/layout/main-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-wrapper min-h-screen bg-auth-custom flex flex-col relative">
      <MainHeader />
      <main className="flex-1 w-full flex flex-col relative h-full">
        <div className="w-full flex-1 h-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col relative">
          {children}
        </div>
      </main>
    </div>
  );
}
