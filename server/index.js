require("dotenv").config();
const { Sequelize } = require("sequelize");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const postRouter = require("./router/postRouter");
const userRouter = require("./router/userRouter");
const autoRouter = require("./router/autoRouter");
const searchRouter = require('./router/searchRouter')

/*sequelize 설정*/
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: "mysql",
      port: process.env.DATABASE_PORT,
      logging: console.log,
      logging: (...msg) => console.log(msg),
    }
  );
  
  const testConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("successfully connected");
    } catch (error) {
      console.log("unalbe to connect to the database", error);
    }
  };
  testConnection();

// 서버 설정
const app = express();
const corsOptions = {
  origin: ['https://fakesearch.link', 'https://www.fakesearch.link'],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".");
    ext = ext[ext.length - 1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

app.use(express.json({ strict: false }));
app.use(cookieParser());
app.use([express.static("public"), upload.array("files")]);
app.use(cors(corsOptions));

app.use("/post", postRouter);
app.use("/users", userRouter);
app.use("/auto", autoRouter);
app.use("/search", searchRouter);

let server = app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is starting on ${process.env.PORT}`);
});

module.exports = server;
