import { ReactNode } from "react";

interface NavBUttonProps {
    text: string;
    onClick: () => void;
    children?: ReactNode;
}

export const NavButton = ({ text, onClick, children }: NavBUttonProps) => {
    return (
        <button className="text-sm flex flex-row justify-start items-center gap-1 hover:bg-blue-100 hover:border-1 hover:border-gray-300 cursor-pointer px-3 py-2 rounded-lg " onClick={onClick}>
            {children}
            {text}
        </button>
    )
}