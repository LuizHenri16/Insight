import { ChevronDownIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface OptionProps {
    id: string;
    nomeDoItem: string;
}

interface MultiSelectDropdownProps {
    options: OptionProps[];
    onChange?: (selectedItems: OptionProps[]) => void;
    value?: OptionProps[];
    disabled?: boolean;
}

const MultiSelectDropdown = ({ options, onChange, value, disabled }: MultiSelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<OptionProps[]>(value || []);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value) {
            setSelectedItems(value);
        }
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (item: OptionProps) => {
        const isSelected = selectedItems.some((s) => s.id === item.id);
        let newSelectedItems;
        if (isSelected) {
            newSelectedItems = selectedItems.filter((s) => s.id !== item.id);
        } else {
            newSelectedItems = [...selectedItems, item];
        }
        setSelectedItems(newSelectedItems);
        if (onChange) onChange(newSelectedItems);
    };

    return (
        <div ref={dropdownRef} className={`${disabled ? 'opacity-50 cursor-not-allowed' : 'w-full'} relative`}>
            <div className='flex justify-between items-center cursor-pointer px-3 py-2.5 border border-[#1B2F53] dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 rounded-xl'
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItems.length > 0
                    ? `${selectedItems.length} selecionado(s)`
                    : "Selecione..."}
                <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon size={18} />
                </span>
            </div>

            {isOpen && (
                <div
                    className='absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg z-10 max-h-[12rem] overflow-y-auto rounded-lg mt-1'>
                    {options.map((option) => (
                        <div
                            className={`p-3 cursor-pointer border-b dark:border-zinc-700 transition-colors hover:bg-blue-50 dark:hover:bg-zinc-700 border-b-gray-200 dark:text-zinc-200 ${selectedItems.some(s => s.id === option.id) ? 'bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300' : ''}`}
                            key={option.id}
                            onClick={() => toggleOption(option)}
                        >
                            <input
                                type="checkbox"
                                readOnly
                                checked={selectedItems.some(s => s.id === option.id)}
                                className='mr-2'
                            />
                            {option.nomeDoItem}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;