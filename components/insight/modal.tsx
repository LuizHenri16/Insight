"use client"

import { Cross2Icon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "../ui/button"

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-5xl",
};

export const BaseModal = ({ children, isOpen, onClose, title, size = "md", dirty }: {
  children: React.ReactNode,
  isOpen: boolean,
  onClose: () => void,
  title: string,
  size?: "sm" | "md" | "lg",
  dirty?: boolean,
}) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [confirmClose, setConfirmClose] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setConfirmClose(false);
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleClose = () => {
        if (dirty && !confirmClose) {
            setConfirmClose(true);
        } else {
            setConfirmClose(false);
            onClose();
        }
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-8">
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px] animate-in fade-in duration-200"
                onClick={handleClose}
            />
            <div
                ref={contentRef}
                className={`relative paper-card rounded-2xl w-full ${sizeClasses[size]} max-h-[85dvh] overflow-y-auto animate-in zoom-in-95 duration-200 p-0`}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-5 pb-4 border-b border-border bg-card">
                    <h2 className="font-semibold text-lg sm:text-xl text-foreground pr-2">{title}</h2>
                    <button
                        onClick={handleClose}
                        className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 rounded-full p-2"
                    >
                        <Cross2Icon width={22} height={22} />
                    </button>
                </div>

                {confirmClose ? (
                    <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-4">
                        <div className="flex flex-col gap-5 p-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-foreground">Alterações não salvas</p>
                                <p className="text-sm text-muted-foreground">Você tem alterações que ainda não foram salvas. Deseja descartá-las?</p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setConfirmClose(false)}>
                                    Continuar editando
                                </Button>
                                <Button type="button" variant="destructive" onClick={onClose}>
                                    Descartar
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-4">
                        {children}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}
