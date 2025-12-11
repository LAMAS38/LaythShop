import { getProducts, getProductById } from "@/lib/products";
import type { Product } from "@/types/Product";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// ✅ SEO par produit
export function generateMetadata(
  { params }: ProductPageProps
): Metadata {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Produit introuvable - LaythShop",
    };
  }

  return {
    title: `${product.name} - LaythShop`,
    description: product.description,
  };
}

// ✅ Pour le rendu côté serveur
export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Produit introuvable</h1>
        <p className="text-gray-600">Ce produit n&apos;existe pas.</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-gray-100 h-64 w-full flex items-center justify-center rounded">
          {/* Plus tard: vraie image */}
          <span className="text-sm text-gray-500">Image à venir</span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <span className="text-2xl font-semibold text-purple-600">
            {product.price.toFixed(2)} $
          </span>
          <button className="mt-4 w-full md:w-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm">
            Ajouter au panier
          </button>
        </div>
      </div>
    </main>
  );
}

// ✅ (optionnel) génération statique des routes
export function generateStaticParams() {
  const products: Product[] = getProducts();
  return products.map((p) => ({ id: p.id }));
}
