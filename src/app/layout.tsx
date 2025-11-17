import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loquia",
  description: "Sua empresa precisa existir na era da IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
