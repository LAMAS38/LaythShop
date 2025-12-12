'use client';  // Cette directive indique que c'est un Client Component

interface AddToCartButtonProps {
  productName: string;
}

export default function AddToCartButton({ productName }: AddToCartButtonProps) {
  const handleAddToCart = () => {
    alert(`"${productName}" ajouté au panier ! 🛒
    
Cette fonctionnalité sera implémentée dans une prochaine étape.`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
    >
      🛒 Ajouter au panier
    </button>
  );
}