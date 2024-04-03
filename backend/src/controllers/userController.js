const User = require("../services/userService")
const bcrypt = require("bcryptjs")
const methods = require('../methods/authMethod')

//
const postUser = async (req, res) => {
    let user = req.body

    // check email exist
    auth = await User.getUserByEmail(user.email)
    if (auth) {
        return res.status(409).json({
            errCode: 1,
            message: "email exist"
        })
    }

    // hash password
    password = await bcrypt.hash(user.password, 10)
    // get time now
    let now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))

    user.email = user.email.toLowerCase()
    user.password = password
    user['created_at'] = now
    user['updated_at'] = now

    await User.insertUser(user)

    return res.status(200).json({
        message: "success"
    })
}

//
const getUser = async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()

    // check email exist
    let user = await User.getUserByEmail(email)
    if (!user) {
        return res.status(401).json({
            errCode: 1,
            message: "email not exist"
        })
    }

    // check password
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
            errCode: 1,
            message: "password not correct"
        })
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    const dataForAccessToken = {
        user_id: user.user_id
    }
    const accessToken = await methods.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    )
    if (!accessToken) {
        return res.status(401).json({
            message: "login not success"
        })
    }

    let refresh_token = await methods.generateToken(
        dataForAccessToken,
        refreshTokenSecret,
        refreshTokenLife,
    ) // tạo 1 refresh token
    if (!user.refresh_token) {
        // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
        await User.updateRefreshToken(user.user_id, refresh_token)
        user.refresh_token = refresh_token
    } else {
        // Nếu user này đã có refresh token thì lấy refresh token đó từ database
        refresh_token = user.refresh_token
    }

    return res.json({
        msg: 'login success',
        accessToken,
        refresh_token,
        user,
    })
}

//
const refreshToken = async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(400).send('access token not exist')
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refresh_token
    if (!refreshTokenFromBody) {
        return res.status(400).send('refresh token not exist')
    }

    const accessTokenSecret =
        process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret
    const accessTokenLife =
        process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife

    // Decode access token đó
    const decoded = await methods.decodeToken(
        accessTokenFromHeader,
        accessTokenSecret,
    )
    if (!decoded) {
        return res.status(400).send('Invalid access token')
    }

    const user_id = decoded.payload.user_id // Lấy username từ payload

    const user = await User.getUserById(user_id)
    if (!user) {
        return res.status(401).send('User not exist')
    }

    if (refreshTokenFromBody !== user.refresh_token) {
        return res.status(400).send(' Invalid refresh token')
    }

    // Tạo access token mới
    const dataForAccessToken = {
        user_id,
    }

    const accessToken = await methods.generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    )
    if (!accessToken) {
        return res
            .status(400)
            .send('create access token not success')
    }
    return res.json({
        accessToken,
    })
}

const getUserByAccessToken = async (req, res) => {
    return res.json({
        user: req.user,
    })
}

module.exports = {
    postUser,
    getUser,
    refreshToken,
    getUserByAccessToken
}