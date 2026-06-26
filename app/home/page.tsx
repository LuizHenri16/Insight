import { InsightTable } from "@/components/insight/table";
import { Suspense } from "react";

export default function ProtectedPage() {
  return (
    <div>
      <Suspense fallback={<div className="w-full flex justify-center items-center text-muted-foreground">Carregando...</div>}>
        <p className="px-4 sm:px-1 py-3 text-2xl font-semibold text-foreground">Cadastros</p>
        <InsightTable />
      </Suspense>
    </div>
  );
}
