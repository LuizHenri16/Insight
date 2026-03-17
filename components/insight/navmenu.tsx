"use client"

import { useState } from "react";
import { BaseModal } from "./modal";
import { CreateForm } from "./form/createForm";
import { NavButton } from "./navbutton";

export const NavMenu = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const handleModalAddOpen = () => {
        setIsModalAddOpen(!isModalAddOpen);
    }

    return (
        <div className="bg-white border-1 border-gray-300 rounded-xl p-2 ">
            <NavButton icon="plus" text="Adicionar" onClick={handleModalAddOpen} />
            {isModalAddOpen && (
                <BaseModal isOpen={isModalAddOpen} onClose={handleModalAddOpen} title="Cadastro">
                    <CreateForm />
                </BaseModal>
            )}
        </div>
    )
}