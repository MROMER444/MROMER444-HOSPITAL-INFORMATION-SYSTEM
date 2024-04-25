const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.post('/create-staff', async (req, res) => {
    try {
        const { error } = staffValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { name, role, address, birthDate, number, gender } = req.body;
        let staff = await prisma.staff.findFirst({ where: { number } });
        if (staff) {
            return res.status(404).json({ "error": "staff already registered!" });
        }
        staff = await prisma.staff.create({
            data: { name, role, address, birthDate, number, gender }
        });

        if (!staff) {
            return res.status(404).json({ "error": "Failed to create staff" });
        } else {
            return res.status(201).json({ "records": { "staff": staff }, "success": true });
        }



    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})






router.put('/update-staff/:id', async (req, res) => {
    try {
        const { error } = staffValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { id } = req.params;
        const staffId = parseInt(id);
        let staff = await prisma.staff.findFirst({ where: { id: staffId } });
        if (!staff) {
            return res.status(404).json({ "error": "staff with this Id not found!" })
        }
        const { name, role, address, birthDate, number, gender } = req.body;
        staff = await prisma.staff.update({
            where: {
                id: staffId,
            },
            data: {
                name: name,
                role: role,
                address: address,
                birthDate: birthDate,
                number: number,
                gender: gender,
            },
        })
        if (!staff) {
            res.status(404).json({ "records": { "message": "can't update this staff" }, "success": false })
        } else {
            res.status(200).json({ "records": { "staff": staff }, "success": true });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }

})







router.get('/get-inventory', async (req, res) => {
    try {
        const Inventory = await prisma.staff.findMany({ where: { role: "Inventory" } });
        if (!Inventory || Inventory.length === 0) {
            res.status(404).json({ 'records': { "Inventory": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Inventory": Inventory, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})



router.get('/get-Physician', async (req, res) => {
    try {
        const physician = await prisma.staff.findMany({ where: { role: "Physician" } });
        if (!physician || physician.length === 0) {
            res.status(404).json({ 'records': { "Physician": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Physician": physician, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})


router.get('/get-Diagnostic', async (req, res) => {
    try {
        const diagnostic = await prisma.staff.findMany({ where: { role: "Diagnostic" } });
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



router.get('/get-Pharmacy', async (req, res) => {
    try {
        const pharmacy = await prisma.staff.findMany({ where: { role: "Pharmacy" } });
        if (!pharmacy || pharmacy.length === 0) {
            res.status(404).json({ 'records': { "Pharmacy": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Pharmacy": pharmacy, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})




router.get('/get-profile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const staff_profile_Id = parseInt(id);
        staff_profile = await prisma.staff.findFirst({ where: { id: staff_profile_Id } });
        if (!staff_profile) {
            return res.status(404).json({ "error": "staff with this Id not found!" })
        } else {
            res.status(200).json({ 'records': { "profile": staff_profile, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})



function staffValidation(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        role: Joi.string().valid('Physician', 'Diagnostic', 'Pharmacy', 'Inventory').required(),
        address: Joi.string().required(),
        birthDate: Joi.date().required(),
        number: Joi.string().min(11).max(11).required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
    }
    return Joi.validate(user, schema);
}


module.exports = router;