'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.AutoComplete, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      User.hasMany(models.SearchData, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      // define association here
    }
  };
  User.init({
    identification: DataTypes.STRING,
    oauth: DataTypes.STRING,
    siteName: DataTypes.STRING,
    themeColor: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};