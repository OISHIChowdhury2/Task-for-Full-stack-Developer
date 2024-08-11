const joi = require("@hapi/joi");


const val = {
    user: joi.object({
        e_name: joi.string().max(20).pattern(new RegExp("^[a-zA-Z]")).required(),
       e_email: joi.string().email().required(),
        e_age: joi.number().integer().required(),
        e_salary: joi.number().integer().required(),
        e_address: joi.string().required(),
        e_joining_date: joi.string().required(),
        e_total_sell:joi.number().integer().required()
    })
};

module.exports = val;