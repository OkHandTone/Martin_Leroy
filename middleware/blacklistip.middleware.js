const fs = require('fs');
const path = require('path');

const blpath = path.join(__dirname, '../blacklist.json');
const blacklist = new Set(JSON.parse(fs.readFileSync(blpath, 'utf8')));

const checkBlacklist = (req, res, next) => {
    if (blacklist.has(req.ip)) {
        return res.status(403).json({ message: "Votre adresse IP est blacklistée." });
    }
    next();
};

module.exports = checkBlacklist;
