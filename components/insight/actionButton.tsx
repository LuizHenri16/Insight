'use client';

import { useState } from "react";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { BaseModal } from "./modal";
import { ViewForm } from "./form/viewForm";
import { EditForm } from "./form/editForm";
import { DeleteConfirmForm } from "./form/confirmForm";

export const ActionButton = ({ type, idEmpresa }: { type: 'view' | 'edit' | 'delete', idEmpresa: number }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    const icons = {
        view: <EyeOpenIcon className="w-4 h-4" />,
        edit: <Pencil2Icon className="w-4 h-4" />,
        delete: <TrashIcon className="w-4 h-4" />
    };

    return (
        <>
            <button
                type="button"
                onClick={toggleModal}
                className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
            >
                {icons[type]}
            </button>

            {modalOpen && type === 'delete' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Excluir">
                    <DeleteConfirmForm idEmpresa={idEmpresa} />
                </BaseModal>
            )}

            {modalOpen && type === 'view' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Visualizar">
                    <ViewForm id={idEmpresa} />
                </BaseModal>
            )}

            {modalOpen && type === 'edit' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Editar">
                    <EditForm id={idEmpresa} />
                </BaseModal>
            )}
        </>
    );
};