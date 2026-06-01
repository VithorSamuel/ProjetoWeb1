const express = require('express');
const router = express.Router();

const cadastroController = require('../controller/' +
    'cadastroController');

router.post('/cadastro', cadastroController.cadastro);

module.exports = router;