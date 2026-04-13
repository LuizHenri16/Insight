import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const HelpCardDropdown = ({ item }: { item: any }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    };

    return (
        <div onClick={toggleOpen} className={`w-full flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-pointer hover:shadow-md transition-shadow duration-200 ${open ? "shadow-lg transition-shadow duration-300" : ""}`}>
            <div className="w-full flex items-center gap-3 ">
                <p>{item.icon}</p>
                <h3 className="font-medium dark:text-zinc-100">{item.title}</h3>
                <ChevronDown className={`ml-auto transition-all duration-300 ${open ? "rotate-180" : ""}`} />
            </div>

            {open && (
                <div className="w-full flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300" >
                    <p className="text-slate-700 dark:text-zinc-300">{item.content}</p>
                </div>
            )}
        </div>
    );
}