"use client"

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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
            <button onClick={toggleDropdown}
                className="text-sm flex flex-row bg-[#1B2F53] gap-2 text-white justify-center items-center hover:border-1 cursor-pointer px-4 py-2 rounded-xl transition-colors">
                {title}
                <div className="border-l border-gray-300 h-4"></div>
                <ChevronDownIcon width={14} height={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-1 py-3 flex flex-col gap-1">
                    {children}
                </div>
            )}
        </div>
    );
};

