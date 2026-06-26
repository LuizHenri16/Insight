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
    const [innerDirty, setInnerDirty] = useState(false);

    const handleModalOpen = () => {
        if (isModalOpen) setInnerDirty(false);
        setIsModalOpen(!isModalOpen);
    }

    const rows = useMemo(() => {
        return ratingCredito?.map((item, index) => (
            <tr key={item.id_rating_credito} className={`transition-colors hover:bg-accent/30 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/10'}`}>
                <td className="py-3 px-4 text-muted-foreground font-mono text-xs">{item.id_rating_credito}</td>
                <td className="py-3 px-4 text-foreground font-medium">{item.rating_credito}</td>
                <td className="py-3 px-4 text-right">
                    <div className="inline-flex gap-1">
                        <ActionButton type="edit" idEmpresa={item.id_rating_credito} entity="ratingCredito" />
                        <ActionButton type="delete" idEmpresa={item.id_rating_credito} />
                    </div>
                </td>
            </tr>
        ));
    }, [ratingCredito]);

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-2 justify-between items-start sm:items-center">
                <h1 className="text-lg font-bold text-foreground">Rating Crédito</h1>
                <Button variant={"default"} className="w-full sm:w-auto" onClick={handleModalOpen}>
                    <Plus size={16} />
                    Cadastrar novo
                </Button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                    <Loader className="animate-spin w-6 h-6" />
                    <p className="text-sm">Carregando ratings de crédito...</p>
                </div>
            ) : ratingCredito?.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <div className="bg-secondary/50 p-4 rounded-full">
                        <Image src="/assets/images/no-data-image.svg" alt="Vazio" width={72} height={72} className="opacity-60" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground">Nenhum rating encontrado</h3>
                        <p className="text-muted-foreground text-sm mt-1">Cadastre um novo rating para começar</p>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary/60">
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">ID</th>
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Rating Crédito</th>
                                <th className="py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {rows}
                        </tbody>
                    </table>
                </div>
            )}
            {isModalOpen && (
                <BaseModal isOpen={isModalOpen} onClose={handleModalOpen} title="Cadastrar Rating de crédito" size="sm" dirty={innerDirty}>
                    <ModalCreateRatingCredito onDirtyChange={setInnerDirty} />
                </BaseModal>
            )}
        </div>
    )
}
