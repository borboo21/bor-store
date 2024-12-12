const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/cart', require('./cart'));
router.use('/device', require('./device'));
router.use('/order', require('./order'));
router.use('/', require('./authorization'));

module.exports = router;
