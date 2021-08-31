const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        // req.userData = {
        //     id: user.id,
        //     userType: user.type
        // }
        req.id = user.id
        req.userType = user.type
        next()
    })
}
module.exports = authenticateToken;