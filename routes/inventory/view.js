const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();








router.get('/get-inventory', async (req, res) => {
    try {
        const inventory = await prisma.inventory.findMany({});
        if (!inventory || inventory.length === 0) {
            res.status(404).json({ 'records': { "inventory": [], "success": false } });
            return;
        } else {
            res.status(200).json({ 'records': { "inventory": inventory, "success": true } });
            return;
        }
    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})
















module.exports = router;