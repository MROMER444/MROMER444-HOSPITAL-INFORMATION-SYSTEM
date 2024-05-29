const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.post('/create-Pharmacy', async (req, res) => {
    try {
        const { error } = PharmacyValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { type, name, unit, quantity, code } = req.body;
        pharmacy = await prisma.Pharmacy.create({
            data: { type, name, unit, quantity, code }
        });

        if (!pharmacy) {
            return res.status(404).json({ "error": "Failed to create diagnostic" });
        } else {
            return res.status(201).json({ "records": { "Pharmacy": pharmacy }, "success": true });
        }

    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})




router.put('/update-Pharmacy/:id', async (req, res) => {
    try {
        const { error } = PharmacyValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { id } = req.params;
        const PharmacyId = parseInt(id);
        let Pharmacy = await prisma.Pharmacy.findFirst({ where: { id: PharmacyId } });
        if (!Pharmacy) {
            return res.status(404).json({ "error": "Pharmacy with this Id not found!" })
        }
        const { type, name, unit, quantity, code } = req.body;
        Pharmacy = await prisma.Pharmacy.update({
            where: {
                id: PharmacyId,
            },
            data: {
                type: type,
                name: name,
                unit: unit,
                quantity: quantity,
                code: code
            },
        })
        if (!Pharmacy) {
            res.status(404).json({ "records": { "message": "can't update this Pharmacy" }, "success": false })
        } else {
            res.status(200).json({ "records": { "Pharmacy": Pharmacy }, "success": true });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }

})



router.get('/get-pharmacy', async (req, res) => {
    try {
        const Pharmacy = await prisma.Pharmacy.findMany({});
        if (!Pharmacy || Pharmacy.length === 0) {
            res.status(404).json({ 'records': { "Pharmacy": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Pharmacy": Pharmacy, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})





function PharmacyValidation(user) {
    const schema = {
        type: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        unit: Joi.string().required(),
        quantity: Joi.string().required(),
        code: Joi.string().required(),
    }
    return Joi.validate(user, schema);
}




module.exports = router;