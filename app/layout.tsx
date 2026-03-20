import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { FeedbackModal } from "@/components/insight/feedbackModal";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Insight",
  description: "Gestão de Relacionamento",
  icons: {
    icon: "/assets/icons/INSIGHT.svg",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${sora.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FeedbackModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
