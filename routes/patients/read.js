const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../auth/user_auth');
const reception_auth = require("../midlleware/reception")






router.get('/by-name/:name', auth , reception_auth ,  async (req, res) => {
    try {

        const { name } = req.params;
        const patient = await prisma.patient.findMany({
            where: { name: { contains: name } }
        });

        if (!patient) {
            res.status(200).json({ 'records': { "patient": [], "success": true } });
        }
        else {
            res.status(200).json({ 'records': { "patient": patient, "success": true } })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Internal Server Error" })
    }
});


router.get('/get-queue', async (req, res) => {
    try {
        const queueData = await prisma.ticket.findMany({
            select: {
                id: true,
                patient: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        gender: true,
                        image: true
                    }
                }
            }
        });

        if (!queueData) {
            res.status(404).json({ 'records': { "Queue": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "Queue": queueData, "success": true } });
            return;
        };
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "msg": "Internal Server Error" });
    }

})




module.exports = router;