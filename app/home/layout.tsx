
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FAFCFF]">
      <div className="flex-1 w-full flex flex-col">
        <nav className="w-full flex justify-center items-center border-b border-b-foreground/10 h-16">
          <div className="w-full flex justify-around items-center text-sm">
            <div className="w-[6rem] flex gap-5 items-center font-semibold text-lg ">
              <Link href={"/home"}>
                <img src="/assets/icons/INSIGHT.svg" alt="Insight" />
              </Link>
            </div>
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
        <div className="flex justify-center items-center p-10">
          {children}
        </div>
      </div>
    </main>
  );
}
