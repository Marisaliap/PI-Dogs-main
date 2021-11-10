const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,  //me genera automáticamente un UUIDV4 que es un datatype de Sequelize
      allowNull: false,                //no se permite que este campo esté vacío, o sea, es un campo requerido
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdInDb: {                  //para distinguir entre los que me trae la api y los creados en la base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
