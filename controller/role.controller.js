const Role = require('../model/role.schema.js');

const getAll = async (req, res, next) => {
    try {
        let result = await Role.findAll();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des rôles." });
    }
};

const getById = async (req, res, next) => {
    try {
        let result = await Role.findOne({
            where: { id: req.params.id }
        });
        if (!result) {
            return res.status(404).json({ error: "Rôle introuvable." });
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du rôle." });
    }
};

const create = async (req, res, next) => {
    try {
        let result = await Role.create({
            name: req.body.name
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: "Impossible de créer le rôle." });
    }
};

const update = async (req, res, next) => {
    try {
        let result = await Role.update(req.body, {
            where: { id: req.params.id }
        });
        if (result[0] === 0) {
            return res.status(404).json({ error: "Rôle introuvable ou aucune modification effectuée." });
        }
        res.status(200).json({ message: "Rôle mis à jour avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du rôle." });
    }
};

const remove = async (req, res, next) => {
    try {
        let result = await Role.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).json({ error: "Rôle introuvable." });
        }
        res.status(200).json({ message: "Rôle supprimé avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du rôle." });
    }
};

module.exports = { getAll, create, getById, update, remove };