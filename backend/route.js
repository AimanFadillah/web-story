const express = require("express");
const LoginController = require("./Controllers/LoginController.js");
const UserController = require("./Controllers/UserController.js");
const RouteGroup = require("./Functions/routeGroup.js");
const Auth = require("./Middleware/AuthMiddleware.js");
const BukuController = require("./Controllers/BukuController.js");

const Route = express.Router();

Route.post("/api/login",LoginController.login);
Route.post("/api/user",UserController.store);

RouteGroup(Route,Auth,(route) => {
    route.get("/api/logout",LoginController.logout);
    route.get("/api/user",UserController.index);

    route.get("/api/buku",BukuController.get);
    route.post("/api/buku",BukuController.store);
    route.get("/api/buku/:id",BukuController.show);
    route.delete("/api/buku/:id",BukuController.destroy);
})

module.exports = Route;
