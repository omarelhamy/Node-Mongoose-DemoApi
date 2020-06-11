const Joi = require("@hapi/joi")

var registerValidation = (data) => {
    const registerSchema = Joi.object({
        name: Joi.string().required().min(6),
        username: Joi.string().required().min(5),
        password: Joi.string().required().min(6)
    })

    return registerSchema.validate(data, { abortEarly: false });
}

var loginValidation = (data) => {

    const loginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })

    return loginSchema.validate(data, { abortEarly: false });
}

module.exports = {
    registerValidation,
    loginValidation
}