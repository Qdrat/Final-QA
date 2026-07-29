// src/data/users.data.js
// Фабрики ниже уже решают, как собрать объект
// юзера под конкретный тест.

export const USER_TYPES = {
    ADMIN: 'admin@test.com',
    STANDARD: 'user1@test.com',
    STANDARD2: 'user2@test.com',
}

export const usersData = {
    [USER_TYPES.ADMIN]: {
        username: 'admin@test.com',
        password: 'admin123',
    },
    [USER_TYPES.STANDARD]: {
        username: 'user1@test.com',
        password: 'user123',
    },
    [USER_TYPES.STANDARD2]: {
        username: 'user2@test.com',
        password: 'user123',
    },
}
