const db = require("../models");

module.exports = {
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    login: (req, res) => {
        res.json({ email: req.user.email, id: req.user.id });
    },

    //The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    register: async (req, res) => {
        try {
            await db.User.create({
                email: req.body.email,
                password: req.body.password,
            });

            res.redirect(307, "/auth/login");
        } catch (err) {
            res.stats(401).json(err);
        }
    },

    //route for logging out
    logout: (req, res) => {
        req.logout();
        res.redirect("/");
        //res.send("yes");
    },

    // Route for getting some data about our user to be used client side


    getUser: async (req, res) => {

        if (req.user) {

            try {
                const user = await db.User.findOne({
                    where: { id: req.user.id },
                    include: [db.Profile, db.Log],
                });

                res.send({ email: user.email, profile: user.Profile, log: user.Logs });
            } catch (err) {
                res.send({ err_msg: err });
            }
        } else {
            // The user is not logged in, send back an empty object
            res.send({});
        }
    },
};