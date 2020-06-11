const User = require("../models/User")
const { loginValidation, registerValidation } = require("../validations/authValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function login(req, res) {
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(401).json({
            type: 'error',
            message: error.details
        })
    }

    const user = await User.findOne({ username: req.body.username })
    if (!user) {
        return res.status(401).json({
            type: 'error',
            message: "Username / Password is wrong."
        })
    }

    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
        return res.status(401).json({
            type: 'error',
            message: "Username / Password is wrong."
        })
    } else {
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECREAT)
        res.header('auth-token', token)

        return res.status(200).json({
            type: "success",
            data: user
        })
    }
}

async function register(req, res) {
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            type: 'error',
            message: error.details
        })
    }

    const isUserExists = await User.findOne({ username: req.body.username })
    if (isUserExists) {
        return res.status(400).json({
            type: 'error',
            message: "Username already exists."
        })
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.status(200).json({
            type: "success",
            data: savedUser
        })
    } catch (error) {
        return res.status(400).json({
            type: 'error',
            message: error
        })
    }
}

module.exports = {
    login,
    register
}