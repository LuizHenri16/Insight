import { getRatingCredito } from "@/api/ratingcredito/routes";
import { Button } from "@/components/ui/button";
import { RatingCredito } from "@/utils/types/ratingcredito";
import { Edit, Trash, Plus, Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ActionButton } from "../actionButton";
import Image from "next/image";
import { useRatingCredito } from "@/hooks/queries/useRatingCredito";

export const RatingCreditoModal = () => {

    const { data: ratingCredito, isLoading } = useRatingCredito();

    const rows = useMemo(() => {
        return ratingCredito?.map((item) => (
            <tr key={item.id_rating_credito} className="border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.id_rating_credito}</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{item.rating_credito}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                    <ActionButton type="edit" idEmpresa={item.id_rating_credito} />
                    <ActionButton type="delete" idEmpresa={item.id_rating_credito} />
                </td>
            </tr>
        ));
    }, [ratingCredito]);

    return (
        <div className="w-full max-h-[24rem] overflow-y-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold dark:text-white">Rating Crédito</h1>
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
                            <th className="py-3 px-4 font-medium dark:text-slate-200">Rating Crédito</th>
                            <th className="py-3 px-4 font-medium dark:text-slate-200 text-right">Ações</th>
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
        </div>
    )
}