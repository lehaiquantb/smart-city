const { ErrorCodes } = require("../helpers/constants");
const { respondWithError } = require("../helpers/messageResponse");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            fullName: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isUnique: function (value, next) {
                        const self = this;
                        User.findOne({ where: { email: value } })
                            .then(function (user) {
                                // reject if a different user wants to use the same email
                                if (user && self.id !== user.id) {
                                    // return  respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'Email address already in use!')
                                    return next('Email already in use!');
                                }
                                return next();
                            })
                            .catch(function (err) {
                                return next(err);
                            });
                    }
                },
                // unique: {
                //     args: true,
                //     msg: 'Email address already in use!'
                // },
            },
            password: {
                type: DataTypes.STRING,
            },
            birthday: {
                type: DataTypes.DATE,
            },
            gender: {
                allowNull: false,
                type: DataTypes.ENUM('male', 'female', 'other'),
                defaultValue: 'other',
            },
            createdBy: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
            updatedBy: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: true,
            },
        },
        {
            tableName: 'users',
            paranoid: true,
        },
    );
    User.associate = function (models) {
        // define association of this model
    };
    return User;
};
