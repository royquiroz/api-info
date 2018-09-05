const Server = require("../models/server");

module.exports = {
  postInfo: (req, res) => {
    let json = req.file.buffer.toString("utf8");
    json = JSON.parse(json);

    Server.find({ notaria: json.id_notaria }, (err, not) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (not.length <= 0) {
        let server = new Server({
          notaria: json.id_notaria,
          info: json
        });

        server.save((err, data) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err
            });
          }
          res.status(200).json({
            ok: true,
            data
          });
        });
      } else {
        Server.update(
          { notaria: json.id_notaria },
          { $push: { info: json } },
          (err, data) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err
              });
            }
            res.status(200).json({
              ok: true,
              data
            });
          }
        );
      }
    });
  },

  getInfo: (req, res) => {
    let offset = req.query.offset || 0;
    offset = Number(offset);

    let limit = req.query.limit || 10;
    limit = Number(limit);

    let query;

    if (req.query.delete === undefined) {
      query = {};
    } else if (req.query.delete == "true") {
      query = { delete: true };
    } else {
      query = { delete: false };
    }

    Server.find(query)
      .skip(offset)
      .limit(limit)
      .exec((err, data) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          });
        }
        if (!data) {
          return res.status(404).json({
            ok: false,
            message: "No existe ningun dato cargado en la BD"
          });
        }
        Server.count({}, (err, total) => {
          if (err) {
            return res.status(500).json({
              ok: false,
              err
            });
          }

          res.status(200).json({
            ok: true,
            data,
            length: data.length,
            total
          });
        });
      });
  }
};
