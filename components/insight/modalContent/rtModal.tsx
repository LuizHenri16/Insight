import { Edit, Trash, Plus } from "lucide-react";

export const RatingCreditoModal = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-white">Rating Crédito</h1>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    <Plus size={16} />
                    Cadastrar novo
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b dark:border-slate-700">
                            <th className="py-3 px-4 font-medium dark:text-slate-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200">Rating Crédito</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Placeholder */}
                        <tr className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">1</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">A+</td>
                            <td className="py-3 px-4 flex justify-end gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-colors" title="Editar">
                                    <Edit size={18} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-md transition-colors" title="Excluir">
                                    <Trash size={18} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}