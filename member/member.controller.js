const express = require("express");
const router = express.Router();
const userService = require("./member.service");

// routes
router.post("/addExp", addExp);
router.post("/addMeditateTime", addMeditateTime);
router.post("/setBirthday", setBirthday);
router.get("/", getAll);
router.delete("/:id", _delete);

module.exports = router;


function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getAllPublic(req, res, next) {
  userService
    .getAllPublic()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function addExp(req, res, next) {
  userService
    .addExp(req.body)
    .then((member) => res.json(member))
    .catch((err) => next(err));
}

function addMeditateTime(req, res, next) {
  userService
    .addMeditateTime(req.body)
    .then((member) => res.json(member))
    .catch((err) => next(err));
}


function setBirthday(req, res, next) {
  userService
    .setBirthday(req.body)
    .then((member) => res.json(member))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
