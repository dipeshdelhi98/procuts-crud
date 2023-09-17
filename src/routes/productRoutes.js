const express = require('express');
const authenticateToken = require('../middlewares/authenticate');
const { getAllProducts } = require('../controllers/productControllers');

const router = express.Router();


router.get('/products',authenticateToken,getAllProducts);

module.exports = router;
