const isEmployee = async (req, res, next) => {
    if (req.userType === 'employee') {
        next();
    }
    return res.status(401).send("Unauthorized!");   
}
const isAdmin = async (req, res, next) => {
    if (req.userType === 'admin') {
        next();
    }
    return res.status(401).send("Unauthorized!");

}

module.exports = { isEmployee, isAdmin }