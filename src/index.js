require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada ✅');


        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    } catch (err) {
        console.error('Error al conectar a MongoDB ❌', err);
    }
})();
