import React, { useState, useRef, useEffect } from 'react';

interface OptionProps {
    id: string;
    nomeDoItem: string;
}

interface MultiSelectDropdownProps {
    options: OptionProps[];
    label: string;
}

const MultiSelectDropdown = ({ options, label }: MultiSelectDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<OptionProps[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fecha o dropdown se clicar fora dele (Outside Click)
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
            <label>{label}</label>

            {/* O "Campo" do Select */}
            <div className='flex justify-between items-center cursor-pointer p-2 border-2 border-gray-500 rounded-lg'
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedItems.length > 0
                    ? `${selectedItems.length} selecionado(s)`
                    : "Selecione..."}
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* O Popup (Dropdown Menu) */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    borderRadius: '4px',
                    marginTop: '5px'
                }}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => toggleOption(option)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                backgroundColor: selectedItems.some(s => s.id === option.id) ? '#e6f7ff' : 'transparent',
                                borderBottom: '1px solid #eee'
                            }}
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