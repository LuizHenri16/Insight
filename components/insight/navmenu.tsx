"use client"

import { useEffect, useState } from "react";
import { BaseModal } from "./modal";
import { CreateForm } from "./modalContent/createForm";
import { NavButton } from "./navbutton";
import { MenuDropdown } from "./menudropdown";
import { GearIcon, PlusIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { ProductsModal } from "./modalContent/productsModal";
import { RatingCreditoModal } from "./modalContent/ratingCreditoModal";
import { AccessModal } from "./modalContent/accessModal";
import { InvestimentosModal } from "./modalContent/investimentosModal";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/api/usuario/routes";
import { windowDispatchFeedback } from "./feedbackModal";

export const NavMenu = () => {
    const router = useRouter();
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalProdutosOpen, setIsModalProdutosOpen] = useState(false);
    const [isModalRatingCreditoOpen, setIsModalRatingCreditoOpen] = useState(false);
    const [isModalAcessosOpen, setIsModalAcessosOpen] = useState(false);
    const [isModalInvestimentosOpen, setIsModalInvestimentosOpen] = useState(false);

    const [role, setRole] = useState("");

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userRole = await getUserRole();
                setRole(userRole); 
            } catch (error: unknown) {
                windowDispatchFeedback("error", error instanceof Error ? error.message : "Erro desconhecido ao tentar obter o papel do usuário. Tente novamente mais tarde.");
            }
        }
        fetchUserRole();
    }, []);

    const handleModalAddOpen = () => {setIsModalAddOpen(!isModalAddOpen);}

    const handleModalProdutosOpen = () => {setIsModalProdutosOpen(!isModalProdutosOpen);}

    const handleModalRatingCreditoOpen = () => {setIsModalRatingCreditoOpen(!isModalRatingCreditoOpen);}

    const handleModalAcessosOpen = () => {setIsModalAcessosOpen(!isModalAcessosOpen);}

    const handleModalInvestimentosOpen = () => {setIsModalInvestimentosOpen(!isModalInvestimentosOpen);}

    return (
        <div className="">
            <MenuDropdown title="Menu">
                <div className="w-full flex flex-col text-left justify-center pb-2 gap-1 border-b border-gray-300 dark:border-zinc-700">
                    <p className="ml-1 text-sm font-normal text-gray-400 dark:text-zinc-500">Configurações</p>

                    {role === "admin" && (
                        <div className="flex flex-col gap-1">
                            <NavButton text="Gerenciar produtos" onClick={handleModalProdutosOpen}>
                                <GearIcon width={18} height={18} />
                            </NavButton>

                            <NavButton text="Gerenciar rating crédito" onClick={handleModalRatingCreditoOpen}>
                                <GearIcon width={18} height={18} />
                            </NavButton>

                            <NavButton text="Gerenciar Investimentos" onClick={handleModalInvestimentosOpen}>
                                <GearIcon width={18} height={18} />
                            </NavButton>

                            {/* <NavButton text="Gerenciar acessos" onClick={handleModalAcessosOpen}>
                                <GearIcon width={18} height={18} />
                            </NavButton> */}
                        </div>
                    )}
                    <NavButton text="Central de Ajuda" onClick={() => router.push("/help")}>
                        <QuestionMarkIcon width={18} height={18} />
                    </NavButton>
                </div>
                <div className="w-full mt-1 flex flex-col text-left justify-center gap-1 ">
                    <h3 className="ml-1 text-sm font-normal text-gray-400 dark:text-zinc-500">Ações</h3>
                    <NavButton text="Novo cadastro" onClick={handleModalAddOpen}>
                        <PlusIcon width={18} height={18} />
                    </NavButton>
                </div>
            </MenuDropdown>

            {isModalAddOpen && (
                <BaseModal isOpen={isModalAddOpen} onClose={handleModalAddOpen} title="Cadastro">
                    <CreateForm />
                </BaseModal>
            )}

            {isModalProdutosOpen && (
                <BaseModal isOpen={isModalProdutosOpen} onClose={handleModalProdutosOpen} title="Gerenciar produtos">
                    <ProductsModal />
                </BaseModal>
            )}

            {isModalRatingCreditoOpen && (
                <BaseModal isOpen={isModalRatingCreditoOpen} onClose={handleModalRatingCreditoOpen} title="Gerenciar rating crédito">
                    <RatingCreditoModal />
                </BaseModal>
            )}

            {isModalAcessosOpen && (
                <BaseModal isOpen={isModalAcessosOpen} onClose={handleModalAcessosOpen} title="Gerenciar acessos">
                    <AccessModal />
                </BaseModal>
            )}

            {isModalInvestimentosOpen && (
                <BaseModal isOpen={isModalInvestimentosOpen} onClose={handleModalInvestimentosOpen} title="Gerenciar Investimentos">
                    <InvestimentosModal />
                </BaseModal>
            )}
        </div>
    )
}