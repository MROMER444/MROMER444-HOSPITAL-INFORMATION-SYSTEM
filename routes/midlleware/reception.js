module.exports = function(req, res, next) {
    if (!(req.staff.role === "Reception")) {
        res.status(403).send('You are not a Reception!');
        return;
    }
    next();
}
