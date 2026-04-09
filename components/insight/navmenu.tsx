"use client"

import { useEffect, useState } from "react";
import { BaseModal } from "./modal";
import { CreateForm } from "./modalContent/createForm";
import { NavButton } from "./navbutton";
import { MenuDropdown } from "./menudropdown";
import { GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { ProductsModal } from "./modalContent/productsModal";
import { RatingCreditoModal } from "./modalContent/ratingCreditoModal";
import { AccessModal } from "./modalContent/accessModal";
import { createClient } from "@/lib/supabase/client";
import { InvestimentosModal } from "./modalContent/investimentos.Modal";

export const NavMenu = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalProdutosOpen, setIsModalProdutosOpen] = useState(false);
    const [isModalRatingCreditoOpen, setIsModalRatingCreditoOpen] = useState(false);
    const [isModalAcessosOpen, setIsModalAcessosOpen] = useState(false);
    const [isModalInvestimentosOpen, setIsModalInvestimentosOpen] = useState(false);

    const [role, setRole] = useState("");

    useEffect(() => {
        const supabase = createClient();

        async function getUserRole() {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (data) {
                    setRole(data.role);
                }
            }
        }
        getUserRole();
    }, [])

    const handleModalAddOpen = () => {
        setIsModalAddOpen(!isModalAddOpen);
    }

    const handleModalProdutosOpen = () => {
        setIsModalProdutosOpen(!isModalProdutosOpen);
    }

    const handleModalRatingCreditoOpen = () => {
        setIsModalRatingCreditoOpen(!isModalRatingCreditoOpen);
    }

    const handleModalAcessosOpen = () => {
        setIsModalAcessosOpen(!isModalAcessosOpen);
    }

    const handleModalInvestimentosOpen = () => {
        setIsModalInvestimentosOpen(!isModalInvestimentosOpen);
    }

    return (
        <div className="w-ful bg-white border-1 border-gray-300 rounded-xl p-2 ">
            <MenuDropdown title="Menu">
                {role === "admin" && (
                    <div className="w-full flex flex-col text-left justify-center pb-2 gap-1 border-b border-gray-300">
                        <p className="ml-1 text-sm font-normal text-gray-400">Configurações</p>

                        <NavButton text="Gerenciar produtos" onClick={handleModalProdutosOpen}>
                            <GearIcon width={18} height={18} />
                        </NavButton>

                        <NavButton text="Gerenciar rating crédito" onClick={handleModalRatingCreditoOpen}>
                            <GearIcon width={18} height={18} />
                        </NavButton>

                        <NavButton text="Gerenciar Investimentos" onClick={handleModalInvestimentosOpen}>
                            <GearIcon width={18} height={18} />
                        </NavButton>

                        <NavButton text="Gerenciar acessos" onClick={handleModalAcessosOpen}>
                            <GearIcon width={18} height={18} />
                        </NavButton>
                    </div>
                )}
                <div className="w-full mt-1 flex flex-col text-left justify-center gap-1 ">
                    <h3 className="ml-1 text-sm font-normal text-gray-400">Ações</h3>
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