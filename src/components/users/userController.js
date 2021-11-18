import i18n from 'i18n';
import { ErrorCodes } from '../../helpers/constants';
import {
    respondSuccess,
    logSystemError,
    respondWithError,
} from '../../helpers/messageResponse';
import {
    createUser,
    deleteUserService,
    getUserDetail,
    getUserListAndTotal,
    updateUser,
} from './userService';
const bCrypt = require('bcrypt');

export async function getList(req, res) {
    try {
        const { page, limit } = req.query;
        const result = await getUserListAndTotal(
            parseInt(page),
            parseInt(limit),
        );
        return res.json(
            respondSuccess({
                items: result.userList,
                totalItems: result.totalItems,
            }),
        );
    } catch (error) {
        return logSystemError(res, error, 'userController - getList');
    }
}

export async function create(req, res) {
    try {
        const result = await createUser(req.body);

        return res.json(respondSuccess({ user: result }));
    } catch (error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_EMAIL_EXIST,
                error.message,
            ),
        );
        // return logSystemError(res, error, 'userController - create');
    }
}

export async function getDetail(req, res) {
    try {
        return res.json(respondSuccess(req.userData));
    } catch (error) {
        return logSystemError(res, error, 'userController - getDetail');
    }
}

export async function update(req, res) {
    try {
        const result = await updateUser(req.params?.id, req.body);

        if (result[0]) {
            return res.json(respondSuccess());
        } else
            res.json(
                respondWithError(
                    ErrorCodes.ERROR_CODE_SYSTEM_ERROR,
                    i18n.__('user.updateFailed'),
                ),
            );
    } catch (error) {
        return logSystemError(res, error, 'userController - update');
    }
}

export async function updatePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        const match = await bCrypt.compare(currentPassword, req.userData.password);
        if (!match) {
            res.json(
                respondWithError(
                    ErrorCodes.ERROR_CODE_OLD_PASSWORD_NOT_CORRECT,
                    i18n.__('auth.login.oldPasswordIsNotCorrect'),
                ),
            );
        }

        const result = await updateUser(req.params?.id, {
            password: bCrypt.hashSync(
                newPassword,
                bCrypt.genSaltSync(8),
                null,
            ),
        });
        if (result[0]) {
            return res.json(respondSuccess());
        }
        throw new Error();

    } catch (error) {
        return logSystemError(res, error, 'userController - update');
    }
}

export async function deleteUser(req, res) {
    try {
        if (req.loginUser.id === req.userData.id) {
            res.json(
                respondWithError(
                    ErrorCodes.ERROR_CODE_SYSTEM_ERROR,
                    i18n.__('user.deleteFailed'),
                ),
            );
        }
        const result = deleteUserService(req.params?.id);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'userController - deleteUser');
    }
}
