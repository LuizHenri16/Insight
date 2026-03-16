import React, { useState, useRef, useEffect } from 'react';

interface OptionProps {
    id: string;
    nomeDoItem: string;
}

interface MultiSelectDropdownProps {
    options: OptionProps[];
}

const MultiSelectDropdown = ({ options }: MultiSelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<OptionProps[]>([]);
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

    const toggleOption = (item: OptionProps) => {
        const isSelected = selectedItems.some((s) => s.id === item.id);
        if (isSelected) {
            setSelectedItems(selectedItems.filter((s) => s.id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    return (
        <div ref={dropdownRef} className="w-[300px] relative">
            <div className='flex justify-between items-center cursor-pointer px-3 py-2.5 border border-[#1B2F53] rounded-xl'
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItems.length > 0
                    ? `${selectedItems.length} selecionado(s)`
                    : "Selecione..."}
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
                <div
                    className='absolute top-full left-0 right-0 bg-white border-1 border-gray-500 shadow-lg z-10 max-h-50 overflow-y-auto rounded-lg mt-1'>
                    {options.map((option) => (
                        <div
                            className={`p-3 cursor-pointer border-b transition-colors hover:bg-blue-50 border-b-gray-200 ${selectedItems.some(s => s.id === option.id) ? 'bg-blue-200' : ''}`}
                            key={option.id}
                            onClick={() => toggleOption(option)}
                        >
                            <input
                                type="checkbox"
                                readOnly
                                checked={selectedItems.some(s => s.id === option.id)}
                                style={{ marginRight: '8px' }}
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