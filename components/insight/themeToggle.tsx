"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <Button
            variant="outline"
            size="sm"
            className="rounded-xl"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Alternar tema"
        >
            {resolvedTheme === "dark" ? (
                <SunIcon width={16} height={16} />
            ) : (
                <MoonIcon width={16} height={16} />
            )}
        </Button>
    );
};
