const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json("Not Authenticated")
    }

    jwt.verify(token, "SECRET", async (err, data) => {
        if (err) {
            return res.status(403).json("not valid token")
        }
        req.userId = data._id
        next()
    })
}

module.exports = { verifyToken }