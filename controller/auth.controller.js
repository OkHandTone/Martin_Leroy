const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const login = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({ message: "Login ou mot de passe incorrect." });
        }

        res.status(200).json({
            email: user.email,
            token: jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.TOKEN)
        });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la connexion." });
    }
};

const signIn = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        let member = await Role.findOne({ where: { name: "Member" } });
        if (!member) {
            return res.status(404).json({ message: "Le rôle Member n'a pas été trouvé." });
        }

        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de l'inscription." });
    }
};

module.exports = { login, signIn };