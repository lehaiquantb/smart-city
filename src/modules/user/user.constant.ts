import * as BaseJoi from 'joi';
import JoiDate from '@joi/date';
import {
    TEXTAREA_MAX_LENGTH,
    INPUT_TEXT_MAX_LENGTH,
    BIRTHDAY_MIN_DATE,
    PHONE_NUMBER_REGEX,
    INPUT_PHONE_MAX_LENGTH,
    MAX_CITIZEN_ID_LENGTH,
    MIN_CITIZEN_ID_LENGTH,
    MAX_BANK_ACCOUNT_LENGTH,
    MIN_BANK_ACCOUNT_LENGTH,
    MAX_TAX_CODE_LENGTH,
    MIN_TAX_CODE_LENGTH,
    MAX_SOCIAL_INSURANCE_LENGTH,
    MIN_SOCIAL_INSURANCE_LENGTH,
} from '../../common/constants';
const Joi = BaseJoi.extend(JoiDate);

export enum UserRole {
    USER = 'member',
    ADMIN = 'admin',
    TENANT = 'tenant',
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

export enum UserStatus {
    WAITING_FOR_APPROVAL = 'waiting_for_approval',
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}

export const userFields = {
    fullName: Joi.string()
        .max(INPUT_TEXT_MAX_LENGTH)
        .required()
        .label('user.fields.fullName'),
    phoneNumber: Joi.string()
        .allow(null)
        .regex(RegExp(PHONE_NUMBER_REGEX))
        .max(INPUT_PHONE_MAX_LENGTH)
        .optional()
        .label('user.fields.phoneNumber'),
    birthday: Joi.date()
        .allow(null)
        .format('YYYY-MM-DD')
        .min(BIRTHDAY_MIN_DATE)
        .less('now')
        .optional()
        .label('user.fields.birthday'),
    gender: Joi.string()
        .allow(null)
        .valid(UserGender.FEMALE, UserGender.MALE, UserGender.OTHER)
        .optional()
        .label('user.fields.gender'),
    roleId: Joi.number().required().label('user.fields.role'),
};

export const AllowUpdateStatus = {
    [UserStatus.WAITING_FOR_APPROVAL]: [UserStatus.ACTIVE, UserStatus.INACTIVE],
    [UserStatus.ACTIVE]: [UserStatus.INACTIVE],
    [UserStatus.INACTIVE]: [UserStatus.ACTIVE],
};

export const excel = ['xls', 'xlsx', 'csv'];

export const userListAttributes = [
    'users.id',
    'users.fullName',
    'users.email',
    'users.phoneNumber',
    'users.birthday',
    'users.gender',
    'users.role',
    'users.createdAt',
    'users.status',
];
