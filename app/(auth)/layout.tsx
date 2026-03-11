import { AuthHeader } from "@/components/layout/auth-header"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="auth-wrapper min-h-screen bg-auth-custom flex flex-col relative">
            <AuthHeader />
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    )
}