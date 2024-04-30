module.exports = function(req, res, next) {
    if (!(req.staff.role === "Pharmacy")) {
        res.status(403).send('You are not a Pharmacy!');
        return;
    }
    next();
}
