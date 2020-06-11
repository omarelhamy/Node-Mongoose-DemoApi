const jwt = require("jsonwebtoken")

module.exports = function(req, res, next) {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({ success: false, message: "unAuthinticated" })
    
    try {
        const valid = jwt.verify(token, process.env.TOKEN_SECREAT)
        if(!valid) return res.status(401).json({ success: false, message: "unAuthinticated" })
        req.user = valid
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "unAuthinticated" })
    }
}