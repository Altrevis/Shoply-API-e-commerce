const express = require('express');
const router = express.Router();

// root route
router.get('/', (req, res) => {
    res.send('Hello World');
});

router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));

module.exports = router;