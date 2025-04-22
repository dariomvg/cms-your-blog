import type { Metadata } from "next";
import "./globals.css";
import ProviderPosts from "@/context/contextPosts";
import ProviderAuth from "@/context/ContextAuth";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CMS | Blog",
  description: "CMS para gestionar el contenido en un blog agregando artículos con Supabase",
  keywords: "cms, editor, blog, artículos"
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
          <ProviderPosts>
            <Header />
            {children}
          </ProviderPosts>
        </ProviderAuth>
        
      </body>
    </html>
  );
}
