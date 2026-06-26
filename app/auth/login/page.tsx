import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8 md:flex-row md:gap-24 background-login-gradient">
      <Image src="/assets/icons/INSIGHT.svg" alt="Logo" width={300} height={20} className="w-48 md:w-[300px] h-auto drop-shadow-sm" />
      <LoginForm />
    </div>
  );
}
