import type { Metadata } from "next";
import Header from "./_components/header";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Sidebar from "./_components/sidebar";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getUser();
  if (!session) {
    return redirect("/dashboard/sign-in");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <Sidebar />
          </aside>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
