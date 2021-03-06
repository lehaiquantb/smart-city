export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_IS_USING = 446,
    INTERNAL_SERVER_ERROR = 500,
    OVER_LIMIT = 447,
}
