//VALIDATION
const Joi = require('joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(6),
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6)
    });

    //Lets Validate the Data before we create a User
    return schema.validate(data);
};

//Login Validation

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(6).email(),
        password: Joi.string().required().min(6)
    });

    //Lets Validate the Data before we create a User
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;