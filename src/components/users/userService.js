import { logger } from '../../helpers/logger';
const models = require('../../models');
const bCrypt = require('bcrypt');

export async function getUserListAndTotal(page = 1, limit = 10) {
    try {
        const offset = (page - 1) * limit;
        const result = await models.User.findAndCountAll({
            offset,
            limit,
            attributes: {
                exclude: ['password'],
            },
        });
        return { userList: result.rows, totalItems: result.count };
    } catch (error) {
        logger.error(`Error in getUserListAndTotal ${error.message}`);
        throw error;
    }
}

export async function getUserDetail(userId) {
    try {
        const user = await models.User.findByPk(userId);
        return user;
    } catch (error) {
        logger.error(`Error in getUserDetail ${error.message}`);
        throw error;
    }
}

export async function updateUser(id, user) {
    try {
        const newUser = await models.User.update(user, {
            where: {
                id,
            },
        });
        console.log(newUser);
        return newUser;
    } catch (error) {
        logger.error(`Error in updateUser ${error.message}`);
        throw error;
    }
}

export async function deleteUserService(id) {
    try {
        const result = await models.User.destroy({
            where: {
                id,
            },
        });
        console.log(result);
        return result;
    } catch (error) {
        logger.error(`Error in deleteUser ${error.message}`);
        throw error;
    }
}

export async function createUser(user) {
    try {
        const result = await models.User.create({
            ...user,
            password: bCrypt.hashSync(
                user?.password,
                bCrypt.genSaltSync(8),
                null,
            ),
        });
        delete result.dataValues.password;
        return result;
    } catch (error) {
        logger.error(`Error in createUser ${error.message}`);
        throw error;
    }
}

