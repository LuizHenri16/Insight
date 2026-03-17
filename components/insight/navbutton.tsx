
import { PlusIcon, GearIcon } from "@radix-ui/react-icons"

const NavButtonIcons = {
    "plus": PlusIcon,
    "gear": GearIcon
}

interface NavBUttonProps {
    icon: keyof typeof NavButtonIcons;
    text: string;
    onClick: () => void;
}

export const NavButton = ({ icon, text, onClick }: NavBUttonProps) => {
    const Icon = NavButtonIcons[icon];
    return (
        <button className="text-sm flex flex-row justify-center items-center gap-1 hover:bg-gray-100 hover:border-1 hover:border-gray-300 cursor-pointer px-2 py-1 rounded-xl " onClick={onClick}>
            {Icon && <Icon width={14} height={14} />}
            {text}
        </button>
    )
}