const jwt = require("jsonwebtoken");

const createToken = (user)=> {
    //sign() creates a token containing all the data you need in the front-end
    const token = jwt.sign(user.id, "" + process.env.JWT_SECRET);
    return token;
};

// const verifyToken 

module.exports = {createToken}