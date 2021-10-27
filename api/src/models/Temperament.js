const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("temperament",{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,  //me genera automáticamente un UUIDV4
            allowNull: false,
            primaryKey: true
          },
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
    },{
        timestamps: false,
    });
};