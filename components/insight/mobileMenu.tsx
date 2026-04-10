"use client"

import { useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { useEffect } from "react"

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen])

    return (
        <div className="md:hidden" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-background p-4 flex flex-col gap-4 z-10 border-b rounded-b-2xl shadow-lg border-foreground/10">
                    {children}
                </div>
            )}
        </div>
    )
}