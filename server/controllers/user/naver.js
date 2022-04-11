const jwt = require("jsonwebtoken");
const { User } = require("../../models/index");
const axios = require("axios");

module.exports = async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        data: null,
        error: {
          path: "users/naver",
          message: "Insufficient body data",
        },
      });
    }
    const userData = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const identification = userData.data.response.id;
  
    try {
      const [user, created] = await User.findOrCreate({
        where: { identification },
        defaults: {
            oauth: 'naver',
            siteName: 'FAKESEARCH',
            themeColor:'#2260FF',
        },
      });
  
      if (!created) {
        /* 회원가입이 되어있을 때 */
        const accessToken = jwt.sign(
            user.dataValues,
          process.env.ACCESS_SECRET,
          { expiresIn: "7d" }
        );
  
        res
          .cookie("accessToken", accessToken)
          .status(200)
          .end();
      } else {
        /* 회원가입 안되어있을 때 */
        const accessToken = jwt.sign(
          user.dataValues,
          process.env.ACCESS_SECRET,
          { expiresIn: "7d" }
        );
        res
          .cookie("accessToken", accessToken)
          .status(201)
          .end();
      }
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
  