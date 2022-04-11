const { SearchData } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { word } = req.query;
    const response = await getAccessToken(req, res);
    if (!word) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/search/word",
          message: "no search word",
        },
      });
    }
    const data = await SearchData.findOne({
      where: {
        [Op.and]: [
          { userId: response.dataValues.id },
          { word },
        ],
      },
    });
    res.status(200).json(data);
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
