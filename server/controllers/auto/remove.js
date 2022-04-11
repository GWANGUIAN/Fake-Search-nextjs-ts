const { AutoComplete } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const {id} = req.body
    if(!id) {
        return res.status(400).json({
            data: null,
            error: {
              path: "/users/site-name",
              message: "no auto-complete data",
            },
          });
    }
     await AutoComplete.destroy({
        where: {
          [Op.and]: [
            {userId: response.dataValues.id},
            {id}
          ]
        },
      });
    res.status(200).end();
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