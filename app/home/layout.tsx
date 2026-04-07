
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { NavMenu } from "@/components/insight/navmenu";
import { Header } from "@/components/insight/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center background-dashboard-gradient">
      <div className="flex-1 w-full flex flex-col">
        <Header />
        <div className="px-4 md:px-10 lg:px-20 py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
