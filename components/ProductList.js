import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ onEditProduct }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Récupérer les produits depuis le backend
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Fonction pour supprimer un produit
  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id)); // Supprime le produit localement après suppression
        alert('Produit supprimé avec succès');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Liste des produits</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Prix: {product.price} €</p>
            <p>Description: {product.description}</p>
            <p>
              Quantité: {product.quantity > 0 ? product.quantity : 'Rupture de stock'}
            </p>
            <button onClick={() => onEditProduct(product)}>Modifier</button>
            {/* Bouton Supprimer */}
            <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
