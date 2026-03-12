import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {

  return (
    <div className="flex flex-row background-login-gradient justify-center gap-[12rem] items-center min-h-svh w-full p-2 md:p-10">
      <Image src="/assets/icons/INSIGHT.svg" alt="Logo" width={300} height={20} />
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
