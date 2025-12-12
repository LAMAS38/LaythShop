import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import productsData from '@/data/products.json';

export default function Home() {
  // Convertir les données JSON en tableau de Products typés
  const products: Product[] = productsData;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header de la page */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur <span className="text-blue-600">LaythShop</span> 🛍️
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits high-tech et accessoires premium
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              ✓ Livraison gratuite
            </span>
            <span className="flex items-center gap-2">
              ✓ Garantie 2 ans
            </span>
            <span className="flex items-center gap-2">
              ✓ Retour 30 jours
            </span>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {products.length}
            </div>
            <div className="text-gray-600">Produits disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {products.filter(p => p.stock > 10).length}
            </div>
            <div className="text-gray-600">En stock</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {new Set(products.map(p => p.category)).size}
            </div>
            <div className="text-gray-600">Catégories</div>
          </div>
        </div>

        {/* Titre de la section produits */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Nos produits ✨
        </h2>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}