import { Product } from '@/types/Product';
import productsData from '@/data/products.json';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

/**
 * Interface pour les paramètres de la page
 * Next.js passe automatiquement ces paramètres
 */
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Fonction pour générer les métadonnées SEO de la page
 * Cette fonction s'exécute côté serveur pour optimiser le référencement
 */
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const products: Product[] = productsData;
  const product = products.find(p => p.id === resolvedParams.id);

  if (!product) {
    return {
      title: 'Produit introuvable - LaythShop',
    };
  }

  return {
    title: `${product.name} - LaythShop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },
  };
}

/**
 * Composant de la page de détails du produit
 */
export default async function ProductPage({ params }: ProductPageProps) {
  // Attendre la résolution des params (Next.js 15)
  const resolvedParams = await params;
  
  // Charger tous les produits
  const products: Product[] = productsData;
  
  // Trouver le produit correspondant à l'ID
  const product = products.find(p => p.id === resolvedParams.id);

  // Si le produit n'existe pas, afficher la page 404
  if (!product) {
    notFound();
  }

  // Fonction pour formater le prix
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(price);
  };

  // Déterminer si le stock est bas
  const isLowStock = product.stock < 10;

  // Formater la date de création
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb - Fil d'Ariane */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Accueil
          </Link>
          <span>→</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </nav>

        {/* Contenu principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Colonne gauche : Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-full rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Badges en overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {product.category}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                  isLowStock 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}>
                  {isLowStock ? '⚠️ Stock bas' : '✓ En stock'}
                </span>
              </div>
            </div>

            {/* Colonne droite : Informations */}
            <div className="flex flex-col">
              {/* En-tête */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Prix */}
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-2">Prix</div>
                <div className="text-5xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Informations de stock */}
              <div className="mb-6 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-semibold">Disponibilité</span>
                  <span className={`font-bold ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}>
                    {product.stock} unités en stock
                  </span>
                </div>
                
                {/* Barre de progression du stock */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      isLowStock ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Détails supplémentaires */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl space-y-3">
                <h3 className="font-bold text-gray-900 mb-4">Informations produit</h3>
                <div className="flex justify-between">
                  <span className="text-gray-600">Catégorie</span>
                  <span className="font-semibold text-gray-900">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ID Produit</span>
                  <span className="font-mono text-sm bg-gray-200 px-3 py-1 rounded">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ajouté le</span>
                  <span className="font-semibold text-gray-900">{formatDate(product.createdAt)}</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3 mt-auto">
                <AddToCartButton productName={product.name} />
                <Link 
                  href="/"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-4 rounded-xl font-semibold transition-colors"
                >
                  ← Retour aux produits
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section produits similaires (placeholder) */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Produits similaires
          </h2>
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            <p>🚧 Section à venir : Produits de la même catégorie</p>
          </div>
        </div>
      </div>
    </main>
  );
}