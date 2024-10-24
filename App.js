import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [productToEdit, setProductToEdit] = useState(null);

  const handleEditProduct = (product) => {
    setProductToEdit(product);
  };

  const clearEdit = () => {
    setProductToEdit(null);
  };

  return (
    <div>
      <h1>Gestion des Produits</h1>
      <ProductForm productToEdit={productToEdit} clearEdit={clearEdit} />
      <ProductList onEditProduct={handleEditProduct} />
    </div>
  );
};

export default App;
