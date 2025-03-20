const Joi = require('joi');

const commentSchema = Joi.object({
    comment: Joi.string().min(3).max(500).required()
});

module.exports = commentSchema;
