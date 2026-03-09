import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InsightTable } from "@/components/insight/table";
import { Suspense } from "react";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {


  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <InsightTable />
    </Suspense>
  );
}
