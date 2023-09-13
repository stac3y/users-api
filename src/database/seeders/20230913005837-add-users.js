'use strict'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')

module.exports = {
    up: async queryInterface => {
        const records = []
        for (let i = 0; i < 100; i++) {
            const password = await bcrypt.hash('Abc123!?', 10)

            const user = {
                name: `user${i}`,
                email: `example${i}@example.com`,
                password,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            records.push(user)
        }
        return queryInterface.bulkInsert('users', records)
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {})
    },
}
