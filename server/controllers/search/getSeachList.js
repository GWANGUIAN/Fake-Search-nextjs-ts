const { SearchData } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const data = await SearchData.findAll({
      attributes: ['word'],
      where: { userId: response.dataValues.id },
      order: [['createdAt','DESC']]
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