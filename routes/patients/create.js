const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../auth/user_auth');
const reception_auth = require("../midlleware/reception")

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage });


router.post('/create-patient',  upload.single('image'), async (req, res) => {
    console.log(req.file);
    console.log(req.body); 
    try {
        const { error } = patientValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { name, number, address, birthDate, emergencycontact, gender } = req.body;
        const image = req.file.path;
        let patient = await prisma.patient.findFirst({ where: { number } });
        if (patient) {
            return res.status(404).json({ "error": "Patient already registered!" });
        }
        patient = await prisma.patient.create({
            data: { name, number, address, birthDate, emergencycontact, gender, image }
        });

        const currentDate = new Date();
        const formattedDateTime = currentDate.toISOString();
        const ticket = await prisma.ticket.create({
            data: {
                patient: { connect: { id: patient.id } },
                dateTime: formattedDateTime
            }
        });
        if (!patient && !ticket) {
            return res.status(404).json({ "error": "Failed to create patient or ticket record" });
        } else {
            return res.status(201).json({ "records": { "patient": patient, "ticket": ticket }, "success": true });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
});









function patientValidation(user) {
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        number: Joi.string().min(11).max(11).required(),
        address: Joi.string().required(),
        birthDate: Joi.date().required(),
        emergencycontact: Joi.string().min(11).max(11).required(),
        gender: Joi.string().valid('MALE', 'FEMALE').required(),
        image: Joi.string().allow(null)
    }
    return Joi.validate(user, schema);
}


module.exports = router;