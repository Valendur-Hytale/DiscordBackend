const express = require("express");
const router = express.Router();
const dataService = require("./data.service");

// routes
router.post("/addData", addData);
router.get("/", getAll);
router.get("/:id", getById);

module.exports = router;

function getAll(req, res, next) {
  dataService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  dataService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function addData(req, res, next) {
  dataService
    .addData(req.body)
    .then((member) => res.json(member))
    .catch((err) => next(err));
}
