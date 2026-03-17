import { Cross2Icon } from '@radix-ui/react-icons'

export const BaseModal = ({ children, isOpen, onClose, title }: { children: React.ReactNode, isOpen: boolean, onClose: () => void, title: string }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-8 rounded-lg">
                <div className="flex justify-between mb-5">
                    <p className="font-semibold text-xl">{title}</p>
                    <button onClick={onClose} className="cursor-pointer hover:bg-slate-100 transition-colors duration-200 rounded-full p-2"><Cross2Icon width={20} height={20} /></button>
                </div>
                {children}
            </div>
        </div>
    )
}