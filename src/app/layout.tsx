
import "./globals.css";

export const metadata = {
  title: "Loquia | Clean Mailchimp-Inspired Layout",
  description: "A clean, elegant Next.js layout inspired by Mailchimp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f9fafb] text-[#22223b] font-sans antialiased min-h-screen">
        <nav className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between mb-12 rounded-2xl border border-[#e9ecef]">
          <div className="text-2xl font-bold tracking-tight text-[#22223b]">Loquia</div>
          <div className="flex gap-8 text-base font-medium">
            <a href="#" className="hover:text-[#3a86ff] transition-colors">Features</a>
            <a href="#" className="hover:text-[#3a86ff] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#3a86ff] transition-colors">About</a>
          </div>
          <button className="ml-8 px-6 py-2 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#00b4d8] text-white font-bold shadow-lg border-2 border-[#3a86ff] hover:from-[#265d97] hover:to-[#0096c7] hover:scale-105 transition-all duration-200">Sign Up</button>
        </nav>
        <main className="max-w-3xl mx-auto px-6 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
