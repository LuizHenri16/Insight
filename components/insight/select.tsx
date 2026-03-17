import { TriangleDownIcon } from '@radix-ui/react-icons';
import React, { useState, useRef, useEffect } from 'react';

interface OptionProps {
    id: string;
    nomeDoItem: string;
}

interface SingleSelectDropdownProps {
    options: OptionProps[];
    onSelect?: (option: OptionProps) => void;
}

const Select = ({ options, onSelect }: SingleSelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OptionProps | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option: OptionProps) => {
        setSelectedItem(option);
        setIsOpen(false);
        if (onSelect) onSelect(option);
    };

    return (
        <div ref={dropdownRef} className="w-[300px] relative font-sans">
            <div
                className={`flex justify-between items-center cursor-pointer px-3 py-2.5 border rounded-xl transition-all
                    ${isOpen ? 'border-blue-500 shadow-sm' : 'border-[#1B2F53]'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedItem ? 'text-black' : 'text-gray-400'}>
                    {selectedItem ? selectedItem.nomeDoItem : "Selecione..."}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <TriangleDownIcon width={20} height={20} />
                </span>
            </div>

            {isOpen && (
                <div className='absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-10 max-h-60 overflow-y-auto rounded-lg mt-1 py-1'>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-3 cursor-pointer transition-colors hover:bg-blue-50
                                ${selectedItem?.id === option.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.nomeDoItem}
                        </div>
                    ))}
                    {options.length === 0 && (
                        <div className="p-3 text-gray-400 text-sm">Nenhuma opção encontrada</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;