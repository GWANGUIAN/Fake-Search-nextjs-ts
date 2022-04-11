const express = require("express");
const router = express.Router();
const {
  auth,
  naver,
  kakao,
  google,
  logout,
  withdrawal,
  guest,
  themeColor,
  siteName
} = require("../controllers/user");

router.get("/auth", auth);
router.post("/naver-login", naver);
router.post("/kakao-login", kakao);
router.post("/google-login", google);
router.post("/guest-login", guest);
router.post("/logout", logout);
router.delete("/withdrawal", withdrawal);
router.patch("/theme-color", themeColor);
router.patch("/site-name", siteName);

module.exports = router;
