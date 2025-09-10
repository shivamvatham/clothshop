const express = require('express');
const helloController = require('../controllers/helloController');

const router = express.Router();

// Hello World route
router.get('/hello', helloController.getHello);

module.exports = router;