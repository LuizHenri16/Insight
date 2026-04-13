"use client";

import { Button } from "@/components/ui/button";
import { deleteEmpresa } from "@/lib/utils/delete";

interface Props {
    idEmpresa: number;
}

export const DeleteConfirmForm = ({ idEmpresa }: Props) => {

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-[#1B2F53] dark:text-zinc-200">Confirmação</p>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Tem certeza que deseja excluir?</p>
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={() => deleteEmpresa(idEmpresa)}>Confirmar</Button>
            </div>
        </div>
    );
}