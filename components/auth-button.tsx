import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = data?.user;
  const emailShort = user?.email?.split("@")[0];

  return user ? (
    <div className="flex justify-end items-center gap-2">
      <p className="text-sm font-medium text-foreground">Olá, {emailShort}!</p>
      <div className="mx-2 border-l border-border h-4"></div>
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
