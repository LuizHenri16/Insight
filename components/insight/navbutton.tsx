import { ReactNode } from "react";

interface NavBUttonProps {
    text: string;
    onClick: () => void;
    children?: ReactNode;
}

export const NavButton = ({ text, onClick, children }: NavBUttonProps) => {
    return (
        <button className="text-sm flex flex-row justify-start items-center gap-1 hover:bg-blue-100 dark:hover:bg-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 cursor-pointer px-3 py-2 rounded-lg dark:text-zinc-200" onClick={onClick}>
            {children}
            {text}
        </button>
    )
}