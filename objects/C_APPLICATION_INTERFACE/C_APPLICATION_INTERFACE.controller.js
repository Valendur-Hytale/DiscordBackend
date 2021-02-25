const express = require('express');
const router = express.Router();

const objectService = require('./C_APPLICATION_INTERFACE.service');
router.post('/create', create);
router.post('/createBulk', createBulk);
router.get('/', getAllByUser);
//router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/delete', _deleteArray);
router.put('/', update);

module.exports = router;


function create(req, res, next) {
    objectService.create(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function createBulk(req, res, next) {
    objectService.createBulk(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUser(req, res, next) {
    objectService.getAllByUser(req.user.sub)
        .then(interfaces => res.json(interfaces))
        .catch(err => next(err));
}


function update(req, res, next) {
    objectService.update(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    objectService.delete(req.params.id, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteArray(req, res, next) {
    objectService.deleteArray(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}
