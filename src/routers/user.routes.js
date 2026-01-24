const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/user.controlle');

// ruta de registro
router.post('/register', registerUser);

// ruta de prueba
router.get('/', (req, res) => {
    res.send('Ruta de usuarios funcionando 🚀');
});

module.exports = router;
