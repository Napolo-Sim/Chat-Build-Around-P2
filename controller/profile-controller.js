const db = require("../models");

module.exports = {
    createProfile: async (req, res) => {
        if (req.user) {
            try {
                const newProfile = await db.Profile.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    address: req.body.address,
                    // foreign ID to link user
                    UserId: req.user.id,
                });

                res.send(newProfile);
            } catch (err) {
                res.send(err);
            }
        } else {
            res.redirect("/");
        }
    },

    getProfile: async (req, res) => {
        db.Profile.findOne({
            where: {
                id: req.user.id,
            },
            include: [db.User],
        }).then((userProfile) => res.send(userProfile));
    },
};