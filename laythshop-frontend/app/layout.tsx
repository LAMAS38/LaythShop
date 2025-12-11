import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaythShop",
  description: "Boutique e-commerce de démonstration par Latifa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header className="border-b bg-white">
          <nav className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 h-16 flex items-center justify-between">
            <div className="font-bold text-lg">LaythShop</div>
            <div className="text-sm text-gray-600">
              {/* Plus tard: lien vers /cart, /admin, etc. */}
              Demo e-commerce
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
