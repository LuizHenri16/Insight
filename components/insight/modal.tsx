export const BaseModal = ({ children, isOpen, onClose, title }: { children: React.ReactNode, isOpen: boolean, onClose: () => void, title: string }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <div className="flex justify-between mb-5">
                    <p className="font-semibold text-xl">{title}</p>
                    <button onClick={onClose}><img src="/assets/icons/close.svg" alt="Fechar" className="cursor-pointer" /></button>
                </div>
                {children}
            </div>
        </div>
    )
}