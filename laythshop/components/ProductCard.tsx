import { Product } from '@/types/Product';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Interface définissant les props du composant ProductCard
 */
interface ProductCardProps {
  product: Product;
}

/**
 * Composant ProductCard - Affiche un produit sous forme de carte
 * 
 * @param product - Le produit à afficher
 * @returns Un composant React affichant une carte de produit
 */
export default function ProductCard({ product }: ProductCardProps) {
  // Fonction utilitaire pour formater le prix
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price);
  };

  // Détermine si le stock est bas (moins de 10 unités)
  const isLowStock = product.stock < 10;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Container de l'image avec effet de zoom au survol */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badge de catégorie */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>

        {/* Badge de stock */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
          isLowStock 
            ? 'bg-orange-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {isLowStock ? '⚠️ Stock bas' : '✓ En stock'}
        </div>
      </div>

      {/* Contenu de la carte */}
      <div className="p-5">
        {/* Nom du produit */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Description tronquée */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Prix et stock */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock} en stock
          </span>
        </div>

        {/* Bouton Voir détails */}
        <Link 
          href={`/product/${product.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  );
}