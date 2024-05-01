const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../auth/user_auth');
const reception_auth = require("../midlleware/reception")



router.delete('/delete-patient/:id', auth , reception_auth , async (req, res) => {
    try {
        const { id } = req.params;
        const patientId = parseInt(id);
        let patient = await prisma.patient.findFirst({ where: { id: patientId } });
        if (!patient) {
            return res.status(404).json({ "error": "patient with this Id not found!" });
        }
        patient = await prisma.patient.delete({ where: { id: patientId } });
        if (!patient) {
            res.status(404).json({ "records": { "message": "can't delete this patient" }, "success": false })
        } else {
            res.status(200).json({ "msg": "patient deleted" });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }
})



module.exports = router;