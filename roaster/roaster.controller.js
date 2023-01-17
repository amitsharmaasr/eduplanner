const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const roasterService = require('./roaster.service');


router.post('', authorize(), createSchema, create);
router.get('/all', authorize(), getAll);
router.get('/filter', authorize(), getRoaster);
router.get('/:id',authorize(), getRoasterById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);


module.exports = router;


function getRoaster(req, res, next) {
    roasterService.getRoaster(req.query.params)
        .then(resp => res.json(resp))
        .catch(next);
}


function create(req, res, next) {
    roasterService.create(req.body)
        .then(() => res.json({ message: 'Roaster created' }))
        .catch(next);
}


function getAll(req, res, next) {
    roasterService.getAllRoaster()
        .then(roasters => res.json(roasters))
        .catch(next);
}


function getRoasterById(req, res, next) {
    roasterService.getRoasterById(req.params.id)
        .then(roaster => res.json(roaster))
        .catch(next);
}



function update(req, res, next) {
    roasterService.updateRoaster(req.params.id, req.body)
        .then(roaster => res.json(roaster))
        .catch(next);
}

function _delete(req, res, next) {
    roasterService.deleteRoaster(req.params.id)
        .then(() => res.json({ message: 'Roaster deleted successfully' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        teacher_id: Joi.string().required(),
        from_date: Joi.string().required(),
        to_date: Joi.string().required(),
        });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        teacher_id: Joi.string().required(),
        from_time: Joi.string().required(''),
        to_time: Joi.string().required(''),
        roaster_date: Joi.DATEONLY().required(),
        booked: Joi.BOOLEAN().valid(true, false),required(),
    });
    validateRequest(req, next, schema);
}