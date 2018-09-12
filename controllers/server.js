const Server = require("../models/server");

module.exports = {
  postInfo: (req, res) => {
    let json = req.file.buffer.toString("utf8");
    json = JSON.parse(json);

    Server.find({ notaria: json.id_notaria }, (err, not) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: `Ocurrio un error al buscar la notaria '${json.id_notaria}'`,
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
              message: `Ocurrio un error al guardar la notaria '${
                json.id_notaria
              }'`,
              err
            });
          }
          res.status(200).json({
            ok: true,
            message: `Se guardo la notaria '${json.id_notaria}' exitosamente`,
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
                message: `Ocurrio un error al actualizar los datos de la notaria '${
                  json.id_notaria
                }'`,
                err
              });
            }
            res.status(200).json({
              ok: true,
              message: `Se actualizo la notaria '${
                json.id_notaria
              }' exitosamente`,
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
            message: `Ocurrio un error al buscar la notaria`,
            err
          });
        }
        if (!data) {
          return res.status(404).json({
            ok: false,
            message: `No existe ningun dato cargado en la BD`
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
            message: `Se encontraron los datos de la notaria`,
            data,
            length: data.length,
            total
          });
        });
      });
  },

  getNotariaId: (req, res) => {
    let id = req.params.id;

    Server.findById(id).exec((err, data) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: `Ocurrio un error al buscar la notaria con el id '${id}'`,
          err
        });
      }
      if (!data) {
        return res.status(404).json({
          ok: false,
          message: `No existe ningun dato cargado en la BD`
        });
      }
      res.status(200).json({
        ok: true,
        message: `Se encontraron datos relacionados con el id '${id}'`,
        data
      });
    });
  }
};
