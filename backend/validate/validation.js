const { userSchema } = require("./utilSchema.js");
const { Validator } = require("jsonschema");

const v = new Validator();

const validateUser = (user) => {
    const validationResult = v.validate(user, userSchema);
    return throwInvalid(validationResult);
}

const throwInvalid = (validationResult) => {
    if (validationResult.errors.length !== 0) {
        const errorFields = validationResult.errors.map(field => {
            if (field.name === 'required') {
                return { [field.argument]: 'field is mandatory' };
            } else {
                const extractedField = field.property.split('.').pop();
                return { [extractedField]: field.message };
            }
        })
        return errorFields;
    } else { return [] }
}

module.exports = { validateUser };
