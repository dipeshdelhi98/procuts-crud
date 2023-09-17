const Product = require('../models/Product');
module.exports={
    getAllProducts: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
      
        try {
          const products = await Product.find()
            .skip((page - 1) * perPage)
            .limit(perPage);
      
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch products' });
        }
      }
}