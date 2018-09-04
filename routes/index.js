const express = require("express");

const app = express();

const server_routes = require("./server");

app.use("/api", server_routes);

module.exports = app;
