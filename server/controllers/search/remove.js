const { SearchData } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const { word } = req.body
    if(!word) {
        return res.status(400).json({
            data: null,
            error: {
              path: "/search",
              message: "no search data",
            },
          });
    }
     await SearchData.destroy({
        where: {
          [Op.and]: [
            {userId: response.dataValues.id},
            {word}
          ]
        },
      });
    res.status(204).end();
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