import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
interface TChildren {
  children: ReactNode;
}
const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const userData = await auth();
  const isUserAdmin = userData?.user?.role === "admin";
  if (!isUserAdmin) {
    redirect("/");
  }
  return <>{children}</>;
};

export default layout;
