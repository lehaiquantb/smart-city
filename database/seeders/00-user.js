const bCrypt = require('bcrypt');
module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    fullName: 'admin',
                    phone: '535352525',
                    email: 'user1@gmail.com',
                    password: bCrypt.hashSync(
                        'tt@1234',
                        bCrypt.genSaltSync(8),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: 1,
                    updatedBy: 1,
                },
                {
                    fullName: 'user2',
                    phone: '535352525',
                    email: 'user2@gmail.com',
                    password: bCrypt.hashSync(
                        'tt@1234',
                        bCrypt.genSaltSync(8),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: 1,
                    updatedBy: 1,
                },
                {
                    fullName: 'user3',
                    phone: '535352525',
                    email: 'user3@gmail.com',
                    password: bCrypt.hashSync(
                        'tt@1234',
                        bCrypt.genSaltSync(8),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: 1,
                    updatedBy: 1,
                },
                {
                    fullName: 'user4',
                    phone: '535352525',
                    email: 'user4@gmail.com',
                    password: bCrypt.hashSync(
                        'tt@1234',
                        bCrypt.genSaltSync(8),
                        null,
                    ),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdBy: 1,
                    updatedBy: 1,
                },
            ],
            {},
        );
    },

    down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
