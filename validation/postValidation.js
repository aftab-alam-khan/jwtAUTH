//VALIDATION
const Joi = require('joi');

//Register Validation
const postValidation = (data) => {
    const schema = Joi.object({

        title: Joi.string().required().min(6).max(55),
        message: Joi.string().required().min(6).max(255)
    });

    //Lets Validate the Data before we create a User
    return schema.validate(data);
};

module.exports.postValidation = postValidation;