
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { NavMenu } from "@/components/insight/navmenu";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center background-dashboard-gradient">
      <div className="flex-1 w-full flex flex-col">
        <nav className="w-full flex justify-between px-4 md:px-10 lg:px-20 items-center border-b border-b-foreground/10 h-14">
          <Link className="w-[6rem]" href={"/home"}>
            <img src="/assets/icons/INSIGHT.svg" alt="Insight" />
          </Link>
          <div className="flex gap-6">
            <NavMenu />
            {!hasEnvVars ? (
              <EnvVarWarning />
            ) : (
              <Suspense>
                <AuthButton />
              </Suspense>
            )}
          </div>
        </nav>
        <div className="px-4 md:px-10 lg:px-20 py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
