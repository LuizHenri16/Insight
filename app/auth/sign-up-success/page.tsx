import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10 background-login-gradient">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                Obrigado por se cadastrar!
              </CardTitle>
              <CardDescription>Confira seu email para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Você se cadastrou com sucesso. Por favor, confira seu email para confirmar sua conta antes de fazer login.
              </p>
              <Link href="/auth/login" className="flex items-center justify-start cursor-pointer underline underline-offset-2 hover:opacity-80 mt-8">
                <p className="text-sm text-primary">Voltar para login</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
