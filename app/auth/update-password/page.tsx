import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 background-login-gradient">
      <UpdatePasswordForm />
    </div>
  );
}
