import { TriangleDownIcon } from '@radix-ui/react-icons';
import React, { useState, useRef, useEffect } from 'react';

interface OptionProps {
    id: string;
    nomeDoItem: string;
}

interface SingleSelectDropdownProps {
    options: OptionProps[];
    onSelect?: (option: OptionProps) => void;
    value?: string;
    disabled?: boolean;
    className?: string;
}

const Select = ({ options, onSelect, value, disabled, className }: SingleSelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OptionProps | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            const defaultOption = options.find(o => o.id === value);
            if (defaultOption) {
                setSelectedItem(defaultOption);
            }
        }
    }, [value, options]);

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
        <div ref={dropdownRef} className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'w-full'} relative font-sans ${className}`}>
            <div
                className={`flex justify-between items-center cursor-pointer px-3 py-2.5 border rounded-xl transition-all
                    bg-white dark:bg-zinc-900 dark:text-zinc-200
                    ${isOpen ? 'border-blue-500 dark:border-blue-400 shadow-sm' : 'border-[#1B2F53] dark:border-zinc-600'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={selectedItem ? 'text-black dark:text-zinc-100' : 'text-gray-500 dark:text-zinc-500'}>
                    {selectedItem ? selectedItem.nomeDoItem : "Selecione..."}
                </span>
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <TriangleDownIcon width={20} height={20} />
                </span>
            </div>

            {isOpen && (
                <div className='absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-xl z-10 max-h-60 overflow-y-auto rounded-lg mt-1 py-1'>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`p-3 cursor-pointer transition-colors hover:bg-blue-50 dark:hover:bg-zinc-700
                                ${selectedItem?.id === option.id ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-zinc-300'}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.nomeDoItem}
                        </div>
                    ))}
                    {options.length === 0 && (
                        <div className="p-3 text-gray-400 dark:text-zinc-500 text-sm">Nenhuma opção encontrada</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Select;