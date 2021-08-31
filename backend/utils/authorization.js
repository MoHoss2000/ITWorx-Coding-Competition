exports.IsEmployee = async (req, res, next) => {
    if (req.userType === 'employee') {
        next();
    }
    return res.status(401).send("Unauthorized!");   
}
exports.IsAdmin = async (req, res, next) => {
    if (req.userType === 'admin') {
        next();
    }
    return res.status(401).send("Unauthorized!");

}