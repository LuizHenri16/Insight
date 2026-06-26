"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircledIcon, CrossCircledIcon, InfoCircledIcon, Cross2Icon } from "@radix-ui/react-icons";
import type { FeedbackType } from "./feedbackModal";

interface Toast {
  id: number;
  type: FeedbackType;
  message: string;
}

let toastId = 0;

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handleFeedback = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: FeedbackType; message: string }>;
      const { type, message } = customEvent.detail;
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, type, message }]);

      if (type === "success" || type === "warning") {
        setTimeout(() => removeToast(id), 4000);
      }
    };

    window.addEventListener("show-feedback", handleFeedback);
    return () => window.removeEventListener("show-feedback", handleFeedback);
  }, [removeToast]);

  if (toasts.length === 0) return null;

  const getIcon = (type: FeedbackType) => {
    switch (type) {
      case "success": return <CheckCircledIcon className="w-5 h-5 text-green-600 dark:text-green-400" />;
      case "error": return <CrossCircledIcon className="w-5 h-5 text-red-500 dark:text-red-400" />;
      case "warning": return <InfoCircledIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
    }
  };

  const getBorder = (type: FeedbackType) => {
    switch (type) {
      case "success": return "border-l-green-500";
      case "error": return "border-l-red-500";
      case "warning": return "border-l-amber-500";
    }
  };

  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-card border border-border border-l-4 ${getBorder(toast.type)} rounded-xl shadow-paper-lg p-4 flex items-start gap-3 animate-in slide-in-from-right-5 fade-in duration-300`}
        >
          <div className="shrink-0 mt-0.5">{getIcon(toast.type)}</div>
          <p className="text-sm text-foreground flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Cross2Icon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
