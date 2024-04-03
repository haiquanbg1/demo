const conn = require("../config/database")

const insertUser = async (user) => {
    await conn.query(
        "insert into users(firstname, lastname, gender, email, password, phone, birthday, city_id, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            user.firstname,
            user.lastname,
            user.gender,
            user.email,
            password,
            user.phone,
            user.birthday,
            user.city_id,
            user.created_at,
            user.updated_at
        ]
    )
}

const getUserByEmail = async (email) => {
    [result, field] = await conn.query(
        'select * from users where email = ?',
        [email]
    )
    return result[0]
}

const getUserById = async (user_id) => {
    [result, field] = await conn.query(
        'select * from users where user_id = ?',
        [user_id]
    )
    return result[0]
}

const updateRefreshToken = async (user_id, refresh_token) => {
    await conn.query(
        'update users set refresh_token = ? where user_id = ?',
        [refresh_token, user_id]
    )
}

module.exports = {
    insertUser,
    getUserByEmail,
    getUserById,
    updateRefreshToken
}