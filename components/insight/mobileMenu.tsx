"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { NavMenu } from "./navmenu"

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className="absolute top-14 left-0 w-full bg-background p-4 flex flex-col gap-4 z-50 border-b rounded-b-2xl shadow-lg border-foreground/10">
                    {children}
                </div>
            )}
        </div>
    )
}