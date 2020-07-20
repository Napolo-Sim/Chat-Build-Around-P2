const db = require("../models");

module.exports = {
    newLog: async (req, res) => {
        if (req.user) {
            try {
                const newLog = await db.Log.create({
                    ...req.body,
                    UserId: req.user.id,
                });
                res.send(newLog);
            } catch (err) {
                res.send({ err_message: err });
            }
        } else {
            res.redirect("/");
        }
    },

    getUserLogs: async (req, res) => {
        if (req.user) {
            try {
                const userLogs = await db.Log.findAll({
                    where: {
                        UserId: req.user.id,
                    },
                });
                res.send(userLogs);
            } catch (err) {
                res.send({ err_message: err });
            }
        } else {
            res.redirect("/");
        }
    },

    getAllLogs: async (req, res) => {
        try {
            const allLogs = await db.Log.findAll({});
            res.send(allLogs);
        } catch (err) {
            res.send({ err_message: err });
        }
    },
};