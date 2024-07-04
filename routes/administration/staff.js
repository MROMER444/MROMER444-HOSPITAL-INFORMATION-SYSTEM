const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const user_auth = require("../auth/user_auth");
const physician_auth = require('../midlleware/physician');
const diagnostic_auth = require("../midlleware/diagnostic")
const inventory_auth = require("../midlleware/inventory")
const pharmacy_auth = require("../midlleware/pharmacy")
const reception_auth = require("../midlleware/reception")


dotenv.config({ path: '.env' })
const JWT_SECRET = process.env.JWT_SECRET


function setAuthorizationHeader(req, res) {
    const token = jwt.sign({ id: req.staff.id, role: req.staff.role }, JWT_SECRET);
    res.header('Authorization', 'Bearer ' + token);
}


router.post('/create-staff',user_auth , async (req, res) => {
    try {
        const { error } = staffValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { name, role, address, birthDate, number, gender, password } = req.body;
        let staff = await prisma.staff.findFirst({ where: { number } });
        if (staff) {
            return res.status(404).json({ "error": "staff already registered!" });
        }
        staff = await prisma.staff.create({
            data: { name, role, address, birthDate, number, gender, password: bcrypt.hashSync(password, 10) }
        });
        const token = jwt.sign({ id: staff.id , role: staff.role }, JWT_SECRET);

        if (!staff) {
            return res.status(404).json({ "error": "Failed to create staff" });
        } else {
            return res.status(201).json({ "records": { "staff": staff , "Token": { token } }, "success": true });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})



router.put('/update-staff/:id',user_auth , async (req, res) => {
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



<<<<<<< Updated upstream
<<<<<<< Updated upstream
router.get('/get-inventory', user_auth , inventory_auth , async (req, res) => {
=======
=======
>>>>>>> Stashed changes




router.get('/get-inventory' , async (req, res) => {
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
        console.log(error);
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})


router.get('/get-Physician', user_auth , physician_auth , async (req, res) => {
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


router.get('/get-Diagnostic', user_auth , diagnostic_auth , async (req, res) => {
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



router.get('/get-Pharmacy', user_auth , pharmacy_auth , async (req, res) => {
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


router.get('/get-profile/:id', user_auth , async (req, res) => {
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
        role: Joi.string().valid('Physician', 'Diagnostic', 'Pharmacy', 'Inventory', 'Reception').required(),
        address: Joi.string().required(),
        birthDate: Joi.date().required(),
        number: Joi.string().min(11).max(11).required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
        password: Joi.string().min(8).required()
    }
    return Joi.validate(user, schema);
}


module.exports = router;