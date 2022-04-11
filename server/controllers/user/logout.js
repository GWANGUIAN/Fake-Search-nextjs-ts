const { User } = require('../../models')
const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
    try {
      const response = await getAccessToken(req, res);

    if (response.dataValues.oauth==='guest') {
      await User.destroy({where:{
        id: response.dataValues.id
      }})
    }
      res.clearCookie("accessToken", { path: "/" });
      res.status(205).end();
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