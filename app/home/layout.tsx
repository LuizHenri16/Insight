import { Sidebar } from "@/components/insight/sidebar";
import { hasEnvVars } from "@/lib/utils";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSection = !hasEnvVars ? (
    <EnvVarWarning />
  ) : (
    <Suspense>
      <AuthButton />
    </Suspense>
  );

  return (
    <main className="min-h-screen background-dashboard-gradient">
      <Sidebar authSection={authSection} />
      <div className="lg:pl-60 min-h-screen flex flex-col">
        <div className="flex-1 px-4 md:px-10 lg:px-16 py-6 pt-20 lg:pt-6">
          {children}
        </div>
      </div>
    </main>
  );
}
