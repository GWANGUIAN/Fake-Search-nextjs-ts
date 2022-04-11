const { getAccessToken } = require("../../utils/vaildation");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);

    return res.status(200).json(response.dataValues);

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
