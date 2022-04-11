"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SearchData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SearchData.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      // define association here
    }
  }
  SearchData.init(
    {
      userId: DataTypes.INTEGER,
      word: DataTypes.STRING,
      profile: DataTypes.JSON,
      news: DataTypes.JSON,
      image: DataTypes.JSON,
      music: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "SearchData",
    }
  );
  return SearchData;
};
