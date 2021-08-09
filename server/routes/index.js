const router = require('express').Router();

const userRoutes = require('./userRoutes.js');

router.use('/api', userRoutes);

module.exports = router;
