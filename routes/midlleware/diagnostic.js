module.exports = function(req, res, next) {
    if (!(req.staff.role === "Diagnostic")) {
        res.status(403).send('You are not a Diagnostic!');
        return;
    }
    next();
}
