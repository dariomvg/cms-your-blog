import type { Metadata } from "next";
import "./globals.css";
import ProviderAuth from "@/context/ContextAuth";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CMS | Blog",
  description:
    "CMS para gestionar el contenido para blogs, portafolios, etc. Agregando artículos con Supabase",
  keywords: "cms, editor, blog, artículos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderAuth>
          <Header />
          {children}
        </ProviderAuth>
      </body>
    </html>
  );
}
