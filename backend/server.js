// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
const uri = "mongodb+srv://ranialzz123@gmail.com:Raniadiego3377@cluster0.mongodb.net/project-magasin?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Définition du modèle Mongoose pour les produits
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  quantity: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Route pour récupérer tous les produits
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Récupérer les produits depuis MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error: err });
  }
});

// Route pour ajouter un nouveau produit avec validation
app.post('/products', async (req, res) => {
  const { name, price, description, quantity } = req.body;

  // Validation : Le prix doit être un nombre positif
  if (price <= 0) {
    return res.status(400).json({ message: 'Le prix doit être un nombre positif' });
  }

  try {
    const newProduct = new Product({ name, price, description, quantity });
    await newProduct.save();  // Sauvegarder dans MongoDB
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit', error: err });
  }
});

// Route pour modifier un produit existant avec validation
app.put('/products/:id', async (req, res) => {
  const { name, price, description, quantity } = req.body;
  const productId = req.params.id;

  // Validation : Le prix doit être un nombre positif
  if (price <= 0) {
    return res.status(400).json({ message: 'Le prix doit être un nombre positif' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, description, quantity }, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error: err });
  }
});

// Route pour supprimer un produit
app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Produit non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error: err });
  }
});

// Démarrage du serveur sur le port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
