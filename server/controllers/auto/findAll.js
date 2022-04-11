const { AutoComplete } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const data = await AutoComplete.findAll({
      where: { userId: response.dataValues.id },
      order: [['word','ASC']]
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
