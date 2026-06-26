"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, ReactNode } from "react"
import { ThemeToggle } from "./themeToggle"
import { NavButton } from "./navbutton"
import { BaseModal } from "./modal"
import { CreateForm } from "./modalContent/createForm"
import { ProductsModal } from "./modalContent/productsModal"
import { RatingCreditoModal } from "./modalContent/ratingCreditoModal"
import { InvestimentosModal } from "./modalContent/investimentosModal"
import { getUserRole } from "@/api/usuario/routes"
import { windowDispatchFeedback } from "./feedbackModal"
import { PlusIcon, GearIcon, QuestionMarkIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"

export const Sidebar = ({ authSection }: { authSection: ReactNode }) => {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [role, setRole] = useState("");

    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalProdutosOpen, setIsModalProdutosOpen] = useState(false);
    const [isModalRatingCreditoOpen, setIsModalRatingCreditoOpen] = useState(false);
    const [isModalInvestimentosOpen, setIsModalInvestimentosOpen] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);

    const mobileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userRole = await getUserRole();
                setRole(userRole);
            } catch (error: unknown) {
                windowDispatchFeedback("error", error instanceof Error ? error.message : "Erro desconhecido ao tentar obter o papel do usuário.");
            }
        }
        fetchUserRole();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
                setMobileOpen(false);
            }
        };
        if (mobileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileOpen]);

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="px-6 py-6 border-b border-border">
                <Link href="/home">
                    <Image src="/assets/icons/INSIGHT.svg" alt="Insight" width={120} height={120} className="h-8 w-auto" />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Ações</p>
                    <NavButton text="Novo cadastro" onClick={() => { setIsModalAddOpen(true); setMobileOpen(false); }}>
                        <PlusIcon width={18} height={18} />
                    </NavButton>
                </div>

                {role === "admin" && (
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Configurações</p>
                        <div className="space-y-0.5">
                            <NavButton text="Produtos" onClick={() => { setIsModalProdutosOpen(true); setMobileOpen(false); }}>
                                <GearIcon width={18} height={18} />
                            </NavButton>
                            <NavButton text="Rating de Crédito" onClick={() => { setIsModalRatingCreditoOpen(true); setMobileOpen(false); }}>
                                <GearIcon width={18} height={18} />
                            </NavButton>
                            <NavButton text="Investimentos" onClick={() => { setIsModalInvestimentosOpen(true); setMobileOpen(false); }}>
                                <GearIcon width={18} height={18} />
                            </NavButton>
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Suporte</p>
                    <NavButton text="Central de Ajuda" onClick={() => { router.push("/help"); setMobileOpen(false); }}>
                        <QuestionMarkIcon width={18} height={18} />
                    </NavButton>
                </div>
            </div>

            <div className="px-4 py-4 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tema</span>
                    <ThemeToggle />
                </div>
                {authSection}
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-card border border-input rounded-xl shadow-paper-sm text-foreground hover:bg-accent transition-colors"
                aria-label="Abrir menu"
            >
                <HamburgerMenuIcon width={20} height={20} />
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <div
                ref={mobileRef}
                className={`lg:hidden fixed top-0 left-0 z-40 h-full w-72 bg-card border-r border-border shadow-paper-lg transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={() => setMobileOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Cross1Icon width={18} height={18} />
                    </button>
                </div>
                {sidebarContent}
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-card border-r border-border shadow-paper-sm flex-col z-20">
                {sidebarContent}
            </aside>

            {/* Modals */}
            {isModalAddOpen && (
                <BaseModal isOpen={isModalAddOpen} onClose={() => { setIsModalAddOpen(false); setIsFormDirty(false); }} title="Cadastro" size="lg" dirty={isFormDirty}>
                    <CreateForm onDirtyChange={setIsFormDirty} />
                </BaseModal>
            )}
            {isModalProdutosOpen && (
                <BaseModal isOpen={isModalProdutosOpen} onClose={() => setIsModalProdutosOpen(false)} title="Gerenciar produtos" size="lg">
                    <ProductsModal />
                </BaseModal>
            )}
            {isModalRatingCreditoOpen && (
                <BaseModal isOpen={isModalRatingCreditoOpen} onClose={() => setIsModalRatingCreditoOpen(false)} title="Gerenciar rating crédito" size="lg">
                    <RatingCreditoModal />
                </BaseModal>
            )}
            {isModalInvestimentosOpen && (
                <BaseModal isOpen={isModalInvestimentosOpen} onClose={() => setIsModalInvestimentosOpen(false)} title="Gerenciar Investimentos" size="lg">
                    <InvestimentosModal />
                </BaseModal>
            )}
        </>
    )
}
