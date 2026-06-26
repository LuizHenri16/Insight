"use client"

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface MenuDropdownProps {
    title?: string;
    children?: ReactNode;
}

export const MenuDropdown = ({ title = "Menu", children }: MenuDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

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
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <Button className="rounded-xl" size="sm" variant="default" onClick={toggleDropdown}>
                {title}
                <div className="border-l border-[1px] border-primary-foreground/50 h-3"></div>
                <ChevronDownIcon width={14} height={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isOpen && (
                <div className="absolute left-[-6rem] md:left-0 mt-2 min-w-60 bg-card border border-input rounded-xl shadow-paper-lg z-20 p-1.5 py-3 flex flex-col gap-1">
                    {children}
                </div>
            )}
        </div>
    );
};
