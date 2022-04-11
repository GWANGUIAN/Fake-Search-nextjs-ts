const { User } = require('../../models');
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  try {
    let duplication = true;
    let randomSet = '';
    while (duplication) {
      randomSet = Math.random().toString(36).slice(2, 15);
      const check = await User.findOne({
          where : { identification: randomSet }
      })
      duplication = !!check;
      console.log(duplication);
    }
      const user = await User.create({
        identification : randomSet,
        oauth: 'guest',
        siteName: 'FAKESEARCH',
        themeColor: '#2260FF'
      })
      const accessToken = jwt.sign(
        user.dataValues,
        process.env.ACCESS_SECRET,
        { expiresIn: "7d" }
      );
      res
        .cookie("accessToken", accessToken)
        .status(201)
        .end();

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