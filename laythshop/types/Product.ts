/**
 * Interface représentant un produit dans la boutique LaythShop
 * 
 * Cette interface définit la structure exacte que TOUS les produits
 * doivent respecter dans notre application.
 */
export interface Product {
  /**
   * Identifiant unique du produit
   * Exemple : "1", "prod_abc123"
   */
  id: string;

  /**
   * Nom du produit
   * Exemple : "MacBook Pro 16 pouces"
   */
  name: string;

  /**
   * Description détaillée du produit
   * Exemple : "Ordinateur portable haut de gamme avec puce M3"
   */
  description: string;

  /**
   * Prix en dollars canadiens
   * Exemple : 2999.99
   */
  price: number;

  /**
   * Catégorie du produit
   * Exemple : "Électronique", "Vêtements", "Livres"
   */
  category: string;

  /**
   * URL de l'image du produit
   * Exemple : "/images/macbook-pro.jpg"
   */
  imageUrl: string;

  /**
   * Quantité disponible en stock
   * Exemple : 15
   */
  stock: number;

  /**
   * Date de création du produit (optionnelle)
   * Le ? signifie que ce champ n'est pas obligatoire
   */
  createdAt?: string;
}

/**
 * Type pour créer un nouveau produit (sans l'ID qui sera généré automatiquement)
 * 
 * Omit<Product, 'id'> = Prend tous les champs de Product SAUF 'id'
 */
export type CreateProductDTO = Omit<Product, 'id' | 'createdAt'>;

/**
 * Type pour mettre à jour un produit (tous les champs sont optionnels)
 * 
 * Partial<Product> = Tous les champs de Product deviennent optionnels
 */
export type UpdateProductDTO = Partial<Omit<Product, 'id'>>;