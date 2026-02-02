const User = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// registrar usuario
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // verificar si ya existe
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // crear usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({
            message: 'Usuario registrado correctamente ✅',
            user: newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario ❌' });
    }
};
// login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        // si no coincide
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'mi_secreto',
            { expiresIn: '1d' }
        );

        res.json({ message: 'Login exitoso ', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en login ', error: error.message });
    }
};
module.exports = {
    registerUser, loginUser
};
