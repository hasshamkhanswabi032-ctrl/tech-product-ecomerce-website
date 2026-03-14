const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

module.exports = router;
