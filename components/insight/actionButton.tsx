import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";

interface ActionButtonProps {
    type: 'view' | 'edit' | 'delete';
    onClick?: () => void;
}

const icons = {
    view: <EyeOpenIcon className="w-4 h-4" color="#6b7280" />,
    edit: <Pencil2Icon className="w-4 h-4" color="#6b7280" />,
    delete: <TrashIcon className="w-4 h-4" color="#6b7280" />
}

export const ActionButton = ({ type, onClick }: ActionButtonProps) => {
    return (
        <button className="p-1 rounded-lg text-white text-xs font-bold hover:bg-gray-200 transition-colors" onClick={onClick}>
            {icons[type]}
        </button>
    );
}