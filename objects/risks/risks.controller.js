const express = require('express');
const router = express.Router();
const riskService = require('./risk.service');

// routes
router.post('/create', create);
router.get('/', getAllByUser);
//router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function create(req, res, next) {
    riskService.create(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUser(req, res, next) {
    riskService.getAllByUser(req.user.sub)
        .then(applications => res.json(applications))
        .catch(err => next(err));
}


/*function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}*/

function _delete(req, res, next) {
    riskService.delete(req.params.id, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}