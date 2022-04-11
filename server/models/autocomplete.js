'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AutoComplete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AutoComplete.belongsTo(models.User,{
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      // define association here
    }
  };
  AutoComplete.init({
    userId: DataTypes.INTEGER,
    word: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AutoComplete',
  });
  return AutoComplete;
};