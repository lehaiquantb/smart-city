import { authenticate } from '../../middleware/auth';
import {
    getList,
    create,
    update,
    deleteUser,
    getDetail,
    updatePassword,
} from './userController';
import { checkUserExist } from './userMiddleware';
import {
    createValidator,
    updateValidator,
    updatePasswordValidator,
    getUserListValidator,
} from './userValidator';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getUserListValidator, getList);
    router.post('/', authenticate(), createValidator, create);
    router.get('/:id', authenticate(), checkUserExist, getDetail);
    router.patch(
        '/:id',
        authenticate(),
        updateValidator,
        checkUserExist,
        update,
    );
    router.patch(
        '/:id/password',
        authenticate(),
        updatePasswordValidator,
        checkUserExist,
        updatePassword,
    );
    router.delete('/:id', authenticate(), checkUserExist, deleteUser);
    app.use('/api/user', router);
};
