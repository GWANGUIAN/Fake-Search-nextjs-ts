const { AutoComplete } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const { word, userId } = req.query;
    const data = await AutoComplete.findAll({
      where: {
        [Op.and]: [
          { userId },
          {
            word: { [Op.like]: `${word}%` },
          },
        ],
      },
      attributes: ['word'],
      order: [["word", "ASC"]],
      limit: 6,
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
