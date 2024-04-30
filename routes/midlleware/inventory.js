module.exports = function(req, res, next) {
    if (!(req.staff.role === "Inventory")) {
        res.status(403).send('You are not a Inventory!');
        return;
    }
    next();
}
