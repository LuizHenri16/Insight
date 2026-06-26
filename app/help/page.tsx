"use client";

import { HelpCardDropdown } from "@/components/insight/helpCard";
import { HELP_CONTENT } from "@/constants/help-content";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HelpPage() {
    const content = HELP_CONTENT;
    const router = useRouter();

    return (
        <div className="min-h-screen background-dashboard-gradient flex flex-col">
            <div className="max-w-4xl mx-auto px-6 py-12 w-full">
                <header className="mb-16">
                    <h1 className="text-3xl font-bold tracking-tight mb-4 text-foreground">Central de Ajuda</h1>
                    <p className="text-muted-foreground text-lg">
                        Guias de uso, termos técnicos ou fluxos de operação do Insight.
                    </p>
                </header>

                <section className="w-full flex flex-col gap-3">
                    {content.map((item) => (
                        <HelpCardDropdown key={item.title} item={item} />
                    ))}
                </section>
            </div>

            <button onClick={() => router.back()} className="fixed bottom-4 right-4 flex bg-primary items-center gap-1 p-3 rounded-full shadow-paper-lg cursor-pointer hover:opacity-90 transition-opacity duration-200 z-10">
                <ChevronLeft className="text-primary-foreground" />
            </button>
        </div>
    );
}
