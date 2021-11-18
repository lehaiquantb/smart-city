import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('joi');
const Extension = require('@joi/date');

const Joi = BaseJoi.extend(Extension);

const userFormSchema = {
    fullName: Joi.string(),
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    birthday: Joi.date(),
    gender: Joi.string().valid('male', 'female', 'other'),
};

const createValidSchema = Joi.object().keys({
    ...userFormSchema,
    password: Joi.string().min(6).max(20).required(),
});

const updateValidSchema = Joi.object().keys(userFormSchema);

export async function createValidator(req, res, next) {
    const { body } = req;

    const result = createValidSchema.validate(body);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

export async function updateValidator(req, res, next) {
    const { body } = req;

    const result = updateValidSchema.validate(body);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const updatePasswordValidSchema = Joi.object().keys({
    currentPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).disallow(Joi.ref('currentPassword')).required(),
});

export async function updatePasswordValidator(req, res, next) {
    const { body } = req;

    const result = updatePasswordValidSchema.validate(body);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const getUserListValidSchema = Joi.object().keys({
    page: Joi.number().required().min(1),
    limit: Joi.number().required().min(1),
});

export async function getUserListValidator(req, res, next) {
    const { query } = req;

    const result = getUserListValidSchema.validate(query);
    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}
