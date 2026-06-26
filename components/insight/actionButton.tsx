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
    const [formDirty, setFormDirty] = useState(false);

    const toggleModal = () => {
        if (!modalOpen) setFormDirty(false);
        setModalOpen(!modalOpen);
    };

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
                className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            >
                {icons[type]}
            </button>

            {modalOpen && type === 'delete' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Excluir" size="sm">
                    <DeleteConfirmForm idEmpresa={idEmpresa} entity={entity} />
                </BaseModal>
            )}


            {modalOpen && type === 'view' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Visualizar" size="lg">
                    <ViewForm id={idEmpresa} />
                </BaseModal>
            )}

            {modalOpen && type === 'edit' && (
                <BaseModal isOpen={modalOpen} onClose={toggleModal} title="Editar" size={entity === 'empresa' ? 'lg' : 'sm'} dirty={formDirty}>
                    {entity === 'produto' ? (
                        <ModalEditProduto id={idEmpresa} onDirtyChange={setFormDirty} />
                    ) : entity === 'ratingCredito' ? (
                        <ModalEditRatingCredito id={idEmpresa} onDirtyChange={setFormDirty} />
                    ) : entity === 'investimento' ? (
                        <ModalEditInvestimento id={idEmpresa} onDirtyChange={setFormDirty} />
                    ) : (
                        <EditForm id={idEmpresa} onDirtyChange={setFormDirty} />
                    )}
                </BaseModal>
            )}
        </>
    );
};
