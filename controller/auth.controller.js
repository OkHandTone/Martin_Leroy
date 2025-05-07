const User = require('./../model/user.schema.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    let user = User.getByEmail(req.body.email);
    if (!user) {
        return res.status(401).json({ message: "Login  incorrect." }); // ne pas mettre cette info car utilisateur peut savoir si le user existe deja
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ message: "Mot passe incorrect." }); // idem 
    }
    res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        }, "ZXZhbCBzZWN1IHdlYg==") // a voir
    });
}

const signIn = async (req,res,next) => {
    let member = await Role.findOne({ where: { name: "Member" } });
    if (!member) {
        return res.status(404).json({ message: "Le rôle Member n'as pas été trouvé" });
    }
    try {
        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 4), // mettre le nombre de boucle de hashage plus elever (ex : 12)
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { login, signIn };