import { InsightTable } from "@/components/insight/table";
import { Suspense } from "react";

export default function ProtectedPage() {
  return (
    <div>
      <Suspense fallback={<div className="w-full flex justify-center items-center">Carregando...</div>}>
        <p className="px-3 py-2 text-xl font-semibold text-[#1B2F53] dark:text-zinc-100">Cadastros</p>
        <InsightTable />
      </Suspense>
    </div>
  );
}
