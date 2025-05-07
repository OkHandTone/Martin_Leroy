const Message = require('../model/message.schema.js');

const getAll = async (req, res, next) => {
    try {
        let result = await Message.findAll();
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération des messages." });
    }
};

const getById = async (req, res, next) => {
    try {
        let result = await Message.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!result) {
            return res.status(404).json({ error: "Message introuvable." });
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la récupération du message." });
    }
};

const create = async (req, res, next) => {
    try {
        let result = await Message.create({
            name: req.body.name
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: "Impossible de créer le message." });
    }
};

const update = async (req, res, next) => {
    try {
        let result = await Message.update(req.body, {
            where: { id: req.params.id }
        });
        if (result[0] === 0) {
            return res.status(404).json({ error: "Message introuvable ou aucune modification effectuée." });
        }
        res.status(200).json({ message: "Message mis à jour avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour du message." });
    }
};

const remove = async (req, res, next) => {
    try {
        let result = await Message.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            return res.status(404).json({ error: "Message introuvable." });
        }
        res.status(200).json({ message: "Message supprimé avec succès." });
    } catch (e) {
        res.status(500).json({ error: "Une erreur est survenue lors de la suppression du message." });
    }
};

module.exports = { getAll, create, getById, update, remove };