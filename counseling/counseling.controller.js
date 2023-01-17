const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const counselingService = require('./counseling.service');


router.post('', authorize(), createSchema, create);
router.get('/all', authorize(), getAllCounseling);
router.get('/filter', authorize(), getCounseling);
router.get('/:id',authorize(), getCounselingById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);


module.exports = router;


function getCounseling(req, res, next) {
    counselingService.getCounseling(req.query.params)
        .then(resp => res.json(resp))
        .catch(next);
}
function create(req, res, next) {
    counselingService.create(req.body)
        .then(() => res.json({ message: 'Counseling created' }))
        .catch(next);
}


function getAllCounseling(req, res, next) {
    counselingService.getAllCounseling()
        .then(resp => res.json(resp))
        .catch(next);
}


function getCounselingById(req, res, next) {
    counselingService.getCounselingById(req.params.id)
        .then(resp => res.json(resp))
        .catch(next);
}


function update(req, res, next) {
    counselingService.update(req.params.id, req.body)
        .then(resp => res.json(resp))
        .catch(next);
}

function _delete(req, res, next) {
    counselingService._delete(req.params.id)
        .then(() => res.json({ message: 'Counseling deleted successfully' }))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        country: Joi.string().required(),
        intake_year: Joi.string().required(),
        course_pursue: Joi.string().required(),
        current_education: Joi.string().required(),
        year_of_education: Joi.integer().required(),
        grade_obtained: Joi.string().required(),
        passport: Joi.string().required(),
        ielts_done: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        teacher_id: Joi.integer().required(),
        roaster_id: Joi.integer().required(),
        date: Joi.date(),.required(),
        counseling_status: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}