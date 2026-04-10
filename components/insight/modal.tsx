"use client"

import { Cross2Icon } from '@radix-ui/react-icons'

export const BaseModal = ({ children, isOpen, onClose, title }: { children: React.ReactNode, isOpen: boolean, onClose: () => void, title: string }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
            <div className="relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full min-w-sm max-w-5xl my-auto animate-in zoom-in-95 duration-200 border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="font-semibold text-xl text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 rounded-full p-2"
                    >
                        <Cross2Icon width={22} height={22} />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[80vh] pr-2">
                    {children}
                </div>
            </div>
        </div>
    )
}