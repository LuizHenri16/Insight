"use client";

import { useEffect, useState } from "react";
import { CheckCircledIcon, CrossCircledIcon, InfoCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export type FeedbackType = "success" | "error" | "warning";

interface FeedbackEvent {
    type: FeedbackType;
    message: string;
}

export const windowDispatchFeedback = (type: FeedbackType, message: string) => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent("show-feedback", {
                detail: { type, message } as FeedbackEvent,
            })
        );
    }
};

export const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackEvent | null>(null);

    useEffect(() => {
        const handleFeedback = (e: Event) => {
            const customEvent = e as CustomEvent<FeedbackEvent>;
            setFeedback(customEvent.detail);
            setIsOpen(true);
            if (customEvent.detail.type === "success" || customEvent.detail.type === "warning") {
                const timer = setTimeout(() => {
                    setIsOpen(false);
                }, 4000);
                return () => clearTimeout(timer);
            }
        };

        window.addEventListener("show-feedback", handleFeedback);
        return () => window.removeEventListener("show-feedback", handleFeedback);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            // Delay clearing feedback for exit animation
            const timer = setTimeout(() => setFeedback(null), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !feedback) return null;

    const currentFeedback = feedback || { type: "info", message: "" };

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <CheckCircledIcon className="w-12 h-12 text-green-500" />;
            case "error":
                return <CrossCircledIcon className="w-12 h-12 text-red-500" />;
            case "warning":
                return <InfoCircledIcon className="w-12 h-12 text-yellow-500" />;
            default:
                return <InfoCircledIcon className="w-12 h-12 text-blue-500" />;
        }
    };

    const getTitle = (type: string) => {
        switch (type) {
            case "success": return "Sucesso";
            case "error": return "Erro";
            case "warning": return "Aviso";
            default: return "Informação";
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col transform transition-all duration-300
                ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"} border border-gray-100 dark:border-zinc-800`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <Cross2Icon className="w-5 h-5" />
                </button>

                <div className="p-6 flex flex-col items-center text-center gap-4">
                    <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-full">
                        {getIcon(currentFeedback.type)}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {getTitle(currentFeedback.type)}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {currentFeedback.message}
                        </p>
                    </div>

                    <Button
                        onClick={() => setIsOpen(false)}
                        className="w-full mt-4"
                        variant={currentFeedback.type === "error" ? "destructive" : "default"}
                    >
                        {currentFeedback.type === "error" ? "Tentar novamente" : "Continuar"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
