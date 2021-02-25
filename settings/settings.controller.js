const express = require('express');
const router = express.Router();
const userService = require('./setting.service');

// routes
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/updateCurrent', updateCurrent);
router.delete('/', _delete);

module.exports = router;


function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateCurrent(req, res, next) {
    userService.update(req.user.sub, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}