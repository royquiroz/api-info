module.exports = {
  postInfo: (req, res) => {
    let json = req.file.buffer.toString("utf8");

    return res.json({
      message: "post del controller",
      res: JSON.parse(json)
    });
  },

  getInfo: (req, res) => {
    return res.json({
      message: "get del controller"
    });
  }
};
