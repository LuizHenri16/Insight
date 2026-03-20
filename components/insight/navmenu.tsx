"use client"

import { useState } from "react";
import { BaseModal } from "./modal";
import { CreateForm } from "./form/createForm";
import { NavButton } from "./navbutton";
import { MenuDropdown } from "./menudropdown";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";

export const NavMenu = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const handleModalAddOpen = () => {
        setIsModalAddOpen(!isModalAddOpen);
    }

    return (
        <div className="bg-white border-1 border-gray-300 rounded-xl p-2 ">
            <MenuDropdown title="Menu">
                <div className="w-full flex flex-col text-left justify-center gap-1">
                    <p className="ml-1 text-sm font-normal text-gray-400">Configurações</p>
                    <NavButton text="Acessos" onClick={handleModalAddOpen}>
                        <GearIcon width={18} height={18} />
                    </NavButton>
                </div>
                <div className="w-full mt-1 flex flex-col text-left justify-center gap-1 border-t border-gray-300">
                    <h3 className="ml-1 text-sm font-normal text-gray-400">Ações</h3>
                    <NavButton text="Adicionar" onClick={handleModalAddOpen}>
                        <PlusIcon width={18} height={18} />
                    </NavButton>
                </div>
            </MenuDropdown>
            {isModalAddOpen && (
                <BaseModal isOpen={isModalAddOpen} onClose={handleModalAddOpen} title="Cadastro">
                    <CreateForm />
                </BaseModal>
            )}
        </div>
    )
}