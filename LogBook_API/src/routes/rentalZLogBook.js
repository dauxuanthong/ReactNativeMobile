const express = require("express");
const router = express.Router();
const logBookController = require("../app/controllers/LogBookController");

// /rentalZLogBook/saveData
router.post("/saveData", logBookController.saveUserData);
// /rentalZLogBook/rentalList
router.get("/rentalList", logBookController.rentalList);
// /rentalZLogBook/deleteItem
router.post("/deleteItem", logBookController.deleteItem);
// /rentalZLogBook/:id
router.get("/:address", logBookController.search);
// /rentalZLogBook/editItem
router.post("/editItem", logBookController.editItem);
// /rentalZLogBook/currentNote/:id
router.get("/currentNote/:id", logBookController.currentNote);
module.exports = router;
