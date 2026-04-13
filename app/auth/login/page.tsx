import { LoginForm } from "@/components/login-form";
import Image from "next/image";

export default function Page() {

  return (
    <div className="h-screen flex flex-col items-center justify-center p-2 gap-20 md:flex-row md:gap-24 bg-background">
      <Image src="/assets/icons/INSIGHT.svg" alt="Logo" width={300} height={20} />
      <LoginForm />
    </div>
  );
}
