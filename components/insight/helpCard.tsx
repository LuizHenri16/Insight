import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface HelpItem {
    title: string;
    content: string;
    icon: string;
    category: string;
}

export const HelpCardDropdown = ({ item }: { item: HelpItem }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div onClick={toggleOpen} className={`w-full flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card cursor-pointer hover:shadow-paper transition-shadow duration-200 ${open ? "shadow-paper-lg" : "shadow-paper-sm"}`}>
            <div className="w-full flex items-center gap-3">
                <p className="text-lg">{item.icon}</p>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <ChevronDown className={`ml-auto text-muted-foreground transition-all duration-300 ${open ? "rotate-180" : ""}`} />
            </div>

            {open && (
                <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <p className="text-muted-foreground">{item.content}</p>
                </div>
            )}
        </div>
    );
}
