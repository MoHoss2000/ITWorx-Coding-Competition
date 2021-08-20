var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');


function checkAuth(req,res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        if(decoded.user_type == 'admin'){
            req.userData = decoded;
            next();
        } else {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
} 

router.get('/', checkAuth, function(req, res, next) {
  res.send("I AM AN ADMIN");
});

module.exports = router;
