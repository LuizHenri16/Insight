"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ExitIcon } from "@radix-ui/react-icons";
export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button className="rounded-xl" variant={"outline"} size={"sm"} onClick={logout}><ExitIcon width={20} height={20} />Logout</Button>;
}
