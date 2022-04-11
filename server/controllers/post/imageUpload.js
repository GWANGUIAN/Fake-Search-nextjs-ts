module.exports = (req, res) => {
    try {
        console.log(req.files)
      if (req.files.length > 0) {
        res.json(req.files[0]);
      }
    }
    catch (err) {
      return res.status(404).json({ data: null, message: "서버 에러" });
    }
  };