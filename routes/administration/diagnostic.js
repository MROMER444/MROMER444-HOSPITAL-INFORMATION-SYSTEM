const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/create-diagnostic', async (req, res) => {
    try {
        const { error } = diagnosticValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { division, type, name, room } = req.body;
        diagnostic = await prisma.Diagnostic.create({
            data: { division, type, name, room }
        });

        if (!diagnostic) {
            return res.status(404).json({ "error": "Failed to create diagnostic" });
        } else {
            return res.status(201).json({ "records": { "diagnostic": diagnostic }, "success": true });
        }

    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})


router.put('/update-diagnostic/:id', async (req, res) => {
    try {
        const { error } = diagnosticValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { id } = req.params;
        const diagnosticId = parseInt(id);
        let diagnostic = await prisma.Diagnostic.findFirst({ where: { id: diagnosticId } });
        if (!diagnostic) {
            return res.status(404).json({ "error": "diagnostic with this Id not found!" })
        }
        const { division, type, name, room } = req.body;
        diagnostic = await prisma.Diagnostic.update({
            where: {
                id: diagnosticId,
            },
            data: {
                division: division,
                type: type,
                name: name,
                room: room,
            },
        })
        if (!diagnostic) {
            res.status(404).json({ "records": { "message": "can't update this diagnostic" }, "success": false })
        } else {
            res.status(200).json({ "records": { "diagnostic": diagnostic }, "success": true });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }

})




router.get('/get-diagnostic', async (req, res) => {
    try {
        const diagnostic = await prisma.Diagnostic.findMany({});
        if (!diagnostic || diagnostic.length === 0) {
            res.status(404).json({ 'records': { "Diagnostic": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Diagnostic": diagnostic, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})



function diagnosticValidation(user) {
    const schema = {
        division: Joi.string().min(3).max(30).required(),
        type: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        room: Joi.string().required(),
    }
    return Joi.validate(user, schema);
}


module.exports = router;