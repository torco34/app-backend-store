require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        // Conectar a MongoDB
        await connectDB();
        console.log('Base de datos conectada ✅');



        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puertos ${PORT}`);
        });
    } catch (err) {
        console.error('Error al conectar a MongoDB ❌', err);
    }
})();
