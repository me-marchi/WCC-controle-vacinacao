const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccineControllers.js");

router.post("/", controller.createVaccine);

router.get("/", controller.getAllVaccines);

router.get("/:id", controller.getVaccine);

router.patch("/:id/vaccinated", controller.updateVaccinated);

router.delete("/:id", controller.deleteVaccine);

module.exports = router;