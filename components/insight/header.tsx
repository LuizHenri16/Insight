import Link from "next/link"
import { NavMenu } from "./navmenu"
import { hasEnvVars } from "@/lib/utils"
import { EnvVarWarning } from "../env-var-warning"
import { Suspense } from "react"
import { AuthButton } from "../auth-button"
import Image from "next/image"
import { MobileMenu } from "./mobileMenu"
import { ThemeToggle } from "./themeToggle"


export const Header = () => {
    const authSection = !hasEnvVars ? (
        <EnvVarWarning />
    ) : (
        <Suspense>
            <AuthButton />
        </Suspense>
    )

    return (
        <nav className="w-full border-b border-b-foreground/10 bg-background h-14 relative">
            <div className="flex justify-between px-4 md:px-10 lg:px-20 items-center h-full">
                <Link href={"/home"}>
                    <Image src="/assets/icons/INSIGHT.svg" alt="Insight" width={100} height={100} />
                </Link>

                <div className="hidden md:flex gap-6 items-center">
                    <NavMenu />
                    <ThemeToggle />
                    {authSection}
                </div>

                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <NavMenu />
                    <MobileMenu>
                        {authSection}
                    </MobileMenu>
                </div>
            </div>
        </nav>
    )
}