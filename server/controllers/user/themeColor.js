const { User } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const {themeColor} = req.body
    if(!themeColor) {
        return res.status(400).json({
            data: null,
            error: {
              path: "/users/theme-color",
              message: "no themeColor data",
            },
          });
    }
     await User.update({ themeColor },{
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
