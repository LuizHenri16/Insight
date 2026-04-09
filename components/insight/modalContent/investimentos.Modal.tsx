import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { ActionButton } from "../actionButton";
import { useEffect, useMemo, useState } from "react";
import { Investimento } from "@/utils/types/investimento";
import { getInvestimento } from "@/api/investimento/routes";
import Image from "next/image";

export const InvestimentosModal = () => {

    const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const rows = useMemo(() => {
        return investimentos.map((investimento) => (
            <tr key={investimento.id_investimento} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{investimento.id_investimento}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{investimento.investimento}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={investimento.id_investimento} />
                    <ActionButton type="delete" idEmpresa={investimento.id_investimento} />
                </td>
            </tr>
        ));
    }, [investimentos]);

    useEffect(() => {
        const fetchInvestimentos = async () => {
            setIsLoading(true);
            const response = await getInvestimento();
            setInvestimentos(response);
            setIsLoading(false);
        }
        fetchInvestimentos();
    }, []);


    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-white">Investimentos</h1>
                <Button className="w-40" variant="default">
                    <Plus size={18} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b dark:border-slate-700">
                            <th className="py-3 px-4 font-medium dark:text-slate-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200">Investimento</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="py-10">
                                    <div className="flex flex-col items-center justify-center animate-pulse gap-2 text-slate-600 dark:text-slate-300">
                                        <Loader className="animate-spin" />
                                        <p>Carregando investimentos...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            investimentos.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={138} height={138} className="mx-auto" />
                                        <h3 className="mt-2 font-semibold text-slate-600 dark:text-slate-300">Nenhum investimento encontrado</h3>
                                    </td>
                                </tr>
                            ) : (
                                rows
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}