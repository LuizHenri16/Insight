import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10 background-login-gradient">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
