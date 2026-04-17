'use client';

import { useState } from "react";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { TrashIcon } from "lucide-react";
import { BaseModal } from "./modal";
import { ViewForm } from "./modalContent/viewForm";
import { EditForm } from "./modalContent/editForm";
import { ModalEditProduto } from "./modalContent/editProduto";
import { ModalEditRatingCredito } from "./modalContent/editRatingCredito";
import { ModalEditInvestimento } from "./modalContent/editInvestimento";
import { DeleteConfirmForm } from "./modalContent/confirmForm";

interface ActionButtonProps {
    type: 'view' | 'edit' | 'delete';
    idEmpresa: number;
    entity?: 'empresa' | 'produto' | 'ratingCredito' | 'investimento';
}

export const ActionButton = ({ type, idEmpresa, entity = 'empresa' }: ActionButtonProps) => {
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
                className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
            >
                {icons[type]}
            </button>

            {modalOpen && type === 'delete' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Excluir">
                    <DeleteConfirmForm idEmpresa={idEmpresa} entity={entity} />
                </BaseModal>
            )}


            {modalOpen && type === 'view' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Visualizar">
                    <ViewForm id={idEmpresa} />
                </BaseModal>
            )}

            {modalOpen && type === 'edit' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Editar">
                    {entity === 'produto' ? (
                        <ModalEditProduto id={idEmpresa} />
                    ) : entity === 'ratingCredito' ? (
                        <ModalEditRatingCredito id={idEmpresa} />
                    ) : entity === 'investimento' ? (
                        <ModalEditInvestimento id={idEmpresa} />
                    ) : (
                        <EditForm id={idEmpresa} />
                    )}
                </BaseModal>
            )}
        </>
    );
};