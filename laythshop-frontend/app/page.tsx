import { getProducts } from "../lib/products";
import { ProductCard } from "../components/ProductCard";


export default function Home() {
  const products = getProducts();

  return (
    <main className="min-h-screen px-4 py-10 md:px-10 lg:px-20 bg-[#f7f7f7]">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Bienvenue sur LaythShop
        </h1>
        <p className="text-gray-600 mb-8">
          Une boutique e-commerce de démonstration pour tester Next.js, TypeScript et tout le reste. 🚀
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
