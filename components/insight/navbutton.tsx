import { ReactNode } from "react";

interface NavBUttonProps {
    text: string;
    onClick: () => void;
    children?: ReactNode;
}

export const NavButton = ({ text, onClick, children }: NavBUttonProps) => {
    return (
        <button className="text-sm flex flex-row justify-start items-center gap-2 hover:bg-accent cursor-pointer px-3 py-2 rounded-lg text-foreground transition-colors" onClick={onClick}>
            {children}
            {text}
        </button>
    )
}
