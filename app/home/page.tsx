import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InsightTable } from "@/components/insight/table";
import { Suspense } from "react";
import { EmpresaTable } from "@/utils/types/Empresa";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default function ProtectedPage({ searchParams }: PageProps) {
  return (
    <div>
      <Suspense fallback={<div className="w-full flex justify-center items-center">Carregando...</div>}>
        <p className="px-3 py-2 text-2xl font-semibold text-[#1B2F53]">Cadastros</p>
        <InsightTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
