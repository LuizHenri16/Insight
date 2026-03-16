"use client"

import { useState } from "react";
import { BaseModal } from "./modal";
import { CreateForm } from "./form/createForm";

export const NavMenu = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);

    const handleModalAddOpen = () => {
        setIsModalAddOpen(!isModalAddOpen);
    }

    return (
        <div className="bg-white border-1 border-gray-300 rounded-xl p-2 ">
            <button onClick={handleModalAddOpen}><img src="/assets/icons/add.svg" alt="" />Adicionar</button>
            {isModalAddOpen && (
                <BaseModal isOpen={isModalAddOpen} onClose={handleModalAddOpen} title="Cadastro">
                    <CreateForm />
                </BaseModal>
            )}
        </div>
    )
}