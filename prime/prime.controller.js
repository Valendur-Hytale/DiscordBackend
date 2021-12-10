const express = require("express");
const router = express.Router();
const primeService = require("./prime.service");

// routes
router.post("/addTeam", addTeam);
router.post("/updateTeam", updateTeam);
router.get("/teams", getAll);
router.delete("/:id", _delete);

module.exports = router;


function getAll(req, res, next) {
  primeService
    .getAll()
    .then((primes) => res.json(primes))
    .catch((err) => next(err));
}

function addTeam(req, res, next) {
  primeService
    .addTeam(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function updateTeam(req, res, next) {
  primeService
    .updateTeam(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}


function _delete(req, res, next) {
  primeService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
