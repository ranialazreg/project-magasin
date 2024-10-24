import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ productToEdit, clearEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
        description: productToEdit.description,
        quantity: productToEdit.quantity
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      // Modifier un produit existant
      axios.put(`http://localhost:5000/products/${productToEdit.id}`, formData)
        .then(() => {
          alert('Produit modifié avec succès');
          clearEdit();  // Effacer le produit à modifier après soumission
        })
        .catch(error => console.error(error));
    } else {
      // Ajouter un nouveau produit
      axios.post('http://localhost:5000/products', formData)
        .then(() => {
          setFormData({ name: '', price: '', description: '', quantity: '' });
          alert('Produit ajouté avec succès');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Prix:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Quantité:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </div>
      <button type="submit">{productToEdit ? 'Modifier le produit' : 'Ajouter le produit'}</button>
    </form>
  );
};

export default ProductForm;
