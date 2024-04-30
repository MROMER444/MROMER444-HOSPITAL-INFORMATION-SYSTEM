module.exports = function(req, res, next) {
    if (!(req.staff.role === "Physician")) {
        res.status(403).send('You are not a Physician!');
        return;
    }
    next();
}
