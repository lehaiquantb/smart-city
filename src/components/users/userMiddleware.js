import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import { logger } from '../../helpers/logger';
import {
    logSystemError,
    respondWithError,
} from '../../helpers/messageResponse';
import db from '../../models';

export async function checkUserExist(req, res, next) {
    try {
        const user = await db.User.findByPk(req.params?.id);
        if (user === null) {
            return res.json(
                respondWithError(
                    ErrorCodes.ERROR_CODE_API_NOT_FOUND,
                    i18n.__('user.notFound'),
                ),
            );
        } else {
            req.userData = user;
        }
        next();
    } catch (error) {
        return logSystemError(res, error, 'userMiddleware - checkUserExist');
    }
}
