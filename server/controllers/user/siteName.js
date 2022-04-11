const { User } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const {siteName} = req.body
    if(!siteName) {
        return res.status(400).json({
            data: null,
            error: {
              path: "/users/site-name",
              message: "no siteName data",
            },
          });
    }
     await User.update({ siteName },{
        where: {
          id: response.dataValues.id,
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