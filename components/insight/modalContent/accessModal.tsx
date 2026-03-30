import { Edit, Trash, Plus } from "lucide-react";
import { useState } from "react";
import { ActionButton } from "../actionButton";
import { Button } from "@/components/ui/button";

export const AccessModal = () => {

    const [usuarios, setUsuarios] = useState<[]>([]);

    return (
        <div className="w-full max-h-[24rem] overflow-y-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-white">Acessos</h1>
                <Button variant={"default"} className="flex items-center gap-2">
                    <Plus size={16} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b dark:border-slate-700">
                            <th className="py-3 px-4 font-medium dark:text-slate-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200">E-mail</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">1</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">usuario@exemplo.com</td>
                            <td className="py-3 px-4 flex justify-end gap-2">
                                <ActionButton type="edit" idEmpresa={1} />
                                <ActionButton type="delete" idEmpresa={1} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}