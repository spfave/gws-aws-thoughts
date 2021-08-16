const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const imageRoutes = require('./imageRoutes.js');

router.use('/api', userRoutes);
router.use('/api', imageRoutes);

module.exports = router;
