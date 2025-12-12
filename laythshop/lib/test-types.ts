import { Product, CreateProductDTO } from '@/types/Product';
import productsData from '@/data/products.json';

/**
 * Fonction de test pour vérifier nos types
 */
export function testProductTypes() {
  // TypeScript vérifie automatiquement que productsData respecte Product[]
  const products: Product[] = productsData;

  console.log('✅ Nombre de produits :', products.length);

  // Test : créer un nouveau produit
  const newProduct: CreateProductDTO = {
    name: "Test Product",
    description: "Ceci est un test",
    price: 99.99,
    category: "Test",
    imageUrl: "/test.jpg",
    stock: 10
    // Remarque : pas besoin de 'id' ni 'createdAt' grâce à CreateProductDTO
  };

  console.log('✅ Nouveau produit créé :', newProduct);

  // Test : TypeScript nous empêche de faire des erreurs
  // Décommente la ligne suivante pour voir l'erreur TypeScript :
  // const badProduct: Product = { name: "Test" }; // ❌ Erreur : il manque des champs !

  return products;
}