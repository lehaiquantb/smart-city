import Joi from 'joi';

export enum LANGUAGES {
    EN = 'en',
    VI = 'vi',
}

export enum NODE_ENV {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
    PROVISION = 'provision',
}

export enum ORDER_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}
export type TYPE_ORM_ORDER_DIRECTION = 'ASC' | 'DESC';

export enum USER_ACTION {
    POST = 'create',
    PATCH = 'update',
    DELETE = 'delete',
}

export enum HTTP_METHOTDS {
    POST = 'post',
    PATCH = 'patch',
    DELETE = 'delete',
}
export enum DATE_FORMAT {
    YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
}

export const APPROVED = { TRUE: 1, FALSE: 0 };

export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_LIMIT_FOR_PAGINATION = 10;
export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = ORDER_DIRECTION.ASC;

export const MIN_ID = 1;
export const MIN_PAGE_SIZE = 0;
export const MIN_PAGE = 1;
export const MAX_PAGE_SIZE = 10000;
export const MAX_PAGE = 10000;

export const BIRTHDAY_MIN_DATE = '1800-01-01';

export const INPUT_TEXT_MAX_LENGTH = 255;
export const INPUT_PHONE_MAX_LENGTH = 11;

export const TEXTAREA_MAX_LENGTH = 2000;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/;

export const PHONE_NUMBER_REGEX = /^(\d*).{10,11}$/;

export const YYYY_MM_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;
export const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';

export const SECONDS_PER_DAY = 86400;

export const SECONDS_PER_FIVE_DAYS = 5 * SECONDS_PER_DAY;

export const MAX_CITIZEN_ID_LENGTH = 12;
export const MIN_CITIZEN_ID_LENGTH = 9;

export const MAX_BANK_ACCOUNT_LENGTH = 14;
export const MIN_BANK_ACCOUNT_LENGTH = 9;

export const MAX_SOCIAL_INSURANCE_LENGTH = 13;
export const MIN_SOCIAL_INSURANCE_LENGTH = 10;

export const MAX_TAX_CODE_LENGTH = 13;
export const MIN_TAX_CODE_LENGTH = 10;

export const READ_FINGER_SCANNER_DATE_FORMAT = 'YYYYMMDD';

export const FINGER_SCANNER_DATA_KEY = 'LAST_DAY_DOWNLOAD_FINGER_SCANNER_DATA';

export const TOKYOTECHBAB_DOMAIN = '@tokyotechlab.com';

export const MAX_LENGTH_DAYS_OF_MONTH = 31;

export const MAX_LENGTH_MONTH = 12;
export const MIN_LENGTH_MONTH = 1;
export const URL_REGEX =
    /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

enum USER_STATUS {
    WAITING_FOR_APPROVAL = 'waiting_for_approval',
    INACTIVE = 'inactive',
    ACTIVE = 'active',
}
export const queryDropdownSchema = Joi.object().keys({
    page: Joi.number().allow(null).min(0).max(MAX_PAGE).optional(),
    limit: Joi.number().allow(null).min(0).max(MAX_PAGE_SIZE).optional(),
    status: Joi.array()
        .items(Joi.string().valid(...Object.values(USER_STATUS)))
        .optional(),
    withDeleted: Joi.string().allow(null, '').valid('true', 'false').optional(),
});

export enum LOG_LEVEL {
    DEBUG = 'debug',
    ALL = 'all',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal',
    OFF = 'off',
    TRACE = 'trace',
}

export const TIMEZONE_HEADER = 'x-timezone';
export const TIMEZONE_DEFAULT = '+07:00';
export const TIMEZONE_NAME_HEADER = 'x-timezone-name';
export const TIMEZONE_NAME_DEFAULT = 'Asia/Bangkok';
