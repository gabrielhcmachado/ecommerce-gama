const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");

routes.get("/", DashboardController.index);
routes.get("/produto", JobController.create);
routes.post("/produto", JobController.save);
routes.get("/produto/:id", JobController.show);
routes.post("/produto/:id", JobController.update);
routes.post("/produto/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;
