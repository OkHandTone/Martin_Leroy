const User = require('./../model/user.schema.js');
const Role = require('../model/role.schema.js');
const bcrypt = require('bcrypt');

const getAll = async (req, res, next) => {
    try {
        let result = await User.findAll();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des utilisateurs." });
    }
};

const getById = async (req, res, next) => {
    try {
        let result = await User.findOne({
            where: { id: req.params.id }
        });
        if (!result) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'utilisateur." });
    }
};

const create = async (req, res, next) => {
    try {
        let member = await Role.findOne({ where: { name: "Member" } });
        if (!member) {
            return res.status(404).json({ message: "Le rôle Member n'a pas été trouvé." });
        }

        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 12),
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la création de l'utilisateur." });
    }
};

const update = async (req, res, next) => {
    try {
        let result = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (result[0] === 0) {
            return res.status(404).json({ error: "Utilisateur introuvable ou aucune modification effectuée." });
        }
        res.status(200).json({ message: "Utilisateur mis à jour avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de l'utilisateur." });
    }
};

const remove = async (req, res, next) => {
    try {
        let result = await User.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression de l'utilisateur." });
    }
};

module.exports = { getAll, create, getById, update, remove };