import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";
import { useMemo, useState } from "react";
import { ActionButton } from "../actionButton";
import Image from "next/image";
import { useRatingCredito } from "@/hooks/queries/useRatingCredito";
import { BaseModal } from "../modal";
import { ModalCreateRatingCredito } from "./createRatingCredito";

export const RatingCreditoModal = () => {

    const { data: ratingCredito, isLoading } = useRatingCredito();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }

    const rows = useMemo(() => {
        return ratingCredito?.map((item) => (
            <tr key={item.id_rating_credito} className="border-b border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                <td className="py-3 px-4 text-slate-600 dark:text-zinc-300">{item.id_rating_credito}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-zinc-300">{item.rating_credito}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={item.id_rating_credito} entity="ratingCredito" />
                    <ActionButton type="delete" idEmpresa={item.id_rating_credito} />
                </td>
            </tr>
        ));
    }, [ratingCredito]);

    return (
        <div className="w-full max-h-[24rem] overflow-y-auto flex flex-col gap-4">
            <div className="flex gap-2 justify-between items-center">
                <h1 className="text-lg font-bold dark:text-zinc-100">Rating Crédito</h1>
                <Button variant={"default"} className="flex items-center gap-2" onClick={handleModalOpen}>
                    <Plus size={16} />
                    Cadastrar novo
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-zinc-700">
                            <th className="py-3 px-4 font-medium dark:text-zinc-200">ID</th>
                            <th className="py-3 px-4 font-medium dark:text-zinc-200">Rating Crédito</th>
                            <th className="py-3 px-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="py-10">
                                    <div className="flex flex-col items-center justify-center animate-pulse gap-2 text-slate-600 dark:text-slate-300">
                                        <Loader className="animate-spin" />
                                        <p>Carregando rating de crédito...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            ratingCredito?.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="py-3 px-4 text-center text-slate-600 dark:text-slate-300">
                                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={138} height={138} className="mx-auto" />
                                        <h3 className="mt-2 font-semibold text-slate-600 dark:text-slate-300">Nenhum rating de crédito encontrado</h3>
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
                <BaseModal isOpen={isModalOpen} onClose={handleModalOpen} title="Cadastrar Rating de crédito">
                    <ModalCreateRatingCredito />
                </BaseModal>
            )}
        </div>
    )
}