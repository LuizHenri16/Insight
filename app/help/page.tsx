"use client";

import { HelpCardDropdown } from "@/components/insight/helpCard";
import { HELP_CONTENT } from "@/constants/help-content";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HelpPage() {
    const content = HELP_CONTENT;
    const router = useRouter();

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 min-h-screen">
            <header className="mb-16">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Central de Ajuda</h1>
                <p className="text-slate-500 text-lg mb-8">
                    Guias de uso, termos técnicos ou fluxos de operação do Insight.
                </p>
            </header>

            <section className="w-full flex flex-col gap-2">
                {content.map((item) => (
                    <HelpCardDropdown key={item.title} item={item} />
                ))}
            </section>

            <button onClick={() => router.push("/home")} className="fixed bottom-4 right-4 flex bg-[#1e293b] items-center gap-1 p-1 rounded-full border border-slate-400 cursor-pointer hover:opacity-80 transition-opacity duration-200 z-10 animate-pulse-slow">
                <ChevronLeft color="white" />
            </button>
        </div>
    );
}