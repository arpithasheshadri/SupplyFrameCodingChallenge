/**
 * user schema
 *
 */
const userSchema = {
    'id': '/userSchema',
    'type': 'object',
    'properties': {
        'firstName': {
            'type': 'string',
            'minLength': 1
        },
        'lastName': {
            'type': 'string',
            'minLength': 1
        },
        'email': {
            'type': 'string',
            'minLength': 1
        },
        'currentPassword': {
            'type': 'string',
            'minLength': 8,
            'maxLength': 15
        },
        'previousPasswords': {
            'type': 'array',
            'items': {
                'type': 'string',
                'minLength': 8,
                'maxLength': 15
            }
        },
        'contact': {
            'type': 'string',
            'minLength': 10,
            'maxLength': 10
        }
    },
    'required': ['firstName', 'lastName', 'currentPassword', 'contact', 'email']
};

module.exports = { userSchema };
