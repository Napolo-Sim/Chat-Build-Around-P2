module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define("Log", {
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        // image: DataTypes.BLOB,
        type: DataTypes.STRING,
    });

    Log.associate = (models) => {
        Log.belongsTo(models.User, {
            foreignKey: { allowNull: false },
        });
    };

    return Log;
};
