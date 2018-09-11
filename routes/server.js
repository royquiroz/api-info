const express = require("express");
const multer = require("multer");
const upload = multer();

const ServerController = require("../controllers/server");

const api = express.Router();

api.post("/server", upload.single("json"), ServerController.postInfo);
api.get("/server", ServerController.getInfo);
api.get("/server/:id", ServerController.getNotariaId);

module.exports = api;
