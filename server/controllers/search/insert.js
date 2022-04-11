const { SearchData } = require("../../models");
const { getAccessToken } = require("../../utils/vaildation");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    const response = await getAccessToken(req, res);
    const { word } = req.body;
    if (!word) {
      return res.status(400).json({
        data: null,
        error: {
          path: "/search",
          message: "no search data",
        },
      });
    }
    const [_, created] = await SearchData.findOrCreate({
      where: {
        [Op.and]: [{ userId: response.dataValues.id }, { word }],
      },
      defaults: {
        userId: response.dataValues.id,
        word,
        profile: {
          type: "profile",
          order: 1,
          view: 0,
          job: "",
          profileImg: "",
          name: "",
          info: [{ title: "", content: "" }],
          subinfo: [],
        },
        news: {
          type: "news",
          view: 0,
          order: 2,
          content: [
            { title: "", content: "", datetime: "", reporter: "", img: "" },
          ],
        },
        image: {
          type: "image",
          view: 0,
          order: 3,
          content: { img1: "", img2: "", img3: "", img4: "" },
        },
        music: {
          type: "music",
          view: 0,
          album: "",
          info: "",
          date: "",
          order: 4,
          title: "",
          artist: "",
        },
      },
    });
    if (created) {
      return res.status(201).json();
    } else {
      return res.status(200).json();
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
