const { AutoComplete } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/users/site-name",
          message: "no auto-complete data",
        },
      });
    }
    const [_, created] = await AutoComplete.findOrCreate({
      where: {
        [Op.and]: [{ userId: response.dataValues.id }, { word }],
      },
      defaults: {
        userId: response.dataValues.id,
        word,
    },
    });
    if (created) {
      return res.status(201).json();
    } else {
      return res.status(200).json();
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      return res.status(400).json({
        err: err.name,
        message: err.message,
      });
    } else {
      throw err;
    }
  }
};
