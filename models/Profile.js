module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        address: DataTypes.STRING,
    });

    Profile.associate = (models) => {
        Profile.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Profile;
};
