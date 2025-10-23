import express from 'express';

// Simule un modèle Product pour l'exemple
const Product = {
  async findAll() {
    // données en mémoire, modifie selon tes besoins
    return [
      { id: 1, name: 'Produit demo', price: 9.99 },
      { id: 2, name: 'Autre produit', price: 19.99 }
    ];
  }
};

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;