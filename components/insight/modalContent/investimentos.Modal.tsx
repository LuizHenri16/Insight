import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { ActionButton } from "../actionButton";
import { useEffect, useMemo, useState } from "react";
import { Investimento } from "@/utils/types/investimento";
import { getInvestimento } from "@/api/investimento/routes";
import Image from "next/image";
import { useInvestimentos } from "@/hooks/queries/useInvestimentos";
import { BaseModal } from "../modal";
import { ModalCreateInvestimento } from "./createInvestimento";

export const InvestimentosModal = () => {

    const { data: investimentos, isLoading } = useInvestimentos();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }

    const rows = useMemo(() => {
        return (investimentos || []).map((investimento) => (
            <tr key={investimento.id_investimento} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-slate-600">{investimento.id_investimento}</td>
                <td className="py-3 px-4 text-slate-600">{investimento.investimento}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={investimento.id_investimento} />
                    <ActionButton type="delete" idEmpresa={investimento.id_investimento} />
                </td>
            </tr>
        ));
    }, [investimentos]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex gap-2 justify-between items-center">
                <h1 className="text-lg font-bold">Investimentos</h1>
                <Button className="w-40" variant="default" onClick={handleModalOpen}>
                    <Plus size={18} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="py-3 px-4 font-medium">ID</th>
                            <th className="py-3 px-4 font-medium">Investimento</th>
                            <th className="py-3 px-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="py-10">
                                    <div className="flex flex-col items-center justify-center animate-pulse gap-2 text-slate-600">
                                        <Loader className="animate-spin" />
                                        <p>Carregando investimentos...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            investimentos?.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-3 px-4 text-center text-slate-600">
                                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={138} height={138} className="mx-auto" />
                                        <h3 className="mt-2 font-semibold text-slate-600">Nenhum investimento encontrado</h3>
                                    </td>
                                </tr>
                            ) : (
                                rows
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <BaseModal isOpen={isModalOpen} onClose={handleModalOpen} title="Cadastrar novo investimento">
                    <ModalCreateInvestimento />
                </BaseModal>
            )}
        </div>
    )
}