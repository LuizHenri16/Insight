import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = data?.user;
  // Exibir somente primeira parte do email
  const emailShort = user?.email?.split("@")[0];

  return user ? (
    <div className="flex justify-end items-center gap-2">
      <p className="text-[.8rem] font-semibold text-gray-800 dark:text-zinc-200">Olá, {emailShort}!</p>
      <div className="mr-2 ml-2 border-l border-[1px] border-gray-500 dark:border-zinc-500 h-4"></div>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
