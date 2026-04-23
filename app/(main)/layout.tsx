import { getUserIdAction } from "@/actions/auth.actions";
import { getUserInterestsDataAction } from "@/actions/maps.actions";
import AuthInitializer from "@/components/auth/AuthInitializer";
import { MainHeader } from "@/components/layout/main-header";
import { cookies } from "next/headers";

export default async function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  let userData = null
  let res1 = null

  if (token) {
    res1 = await getUserIdAction();
    if (res1.success) {
      userData = await getUserInterestsDataAction(res1.data.user_id);
    }
  }

  return (
    <div className="auth-wrapper min-h-screen bg-auth-custom flex flex-col relative">
      {userData?.success && res1?.success && <AuthInitializer data={userData?.data?.profile} user_id={res1.data.user_id} email={res1.data.email} />}
      <MainHeader />
      <main className="flex-1 w-full flex flex-col relative h-full">
        <div className="w-full flex-1 h-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col relative">
          {children}
        </div>
      </main>
      {modal}
    </div>
  );
}
