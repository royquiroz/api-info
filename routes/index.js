const express = require("express");

const app = express();

const server_routes = require("./server");

app.use("/api", server_routes);
app.use("/", (req, res) => {
  res.send(
    "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Json</title></head><body><form action='/v1/api/server' method='post' enctype='multipart/form-data'><input type='file' name='json' multiple='multiple'><input type='submit'></form></body></html>"
  );
});

module.exports = app;
