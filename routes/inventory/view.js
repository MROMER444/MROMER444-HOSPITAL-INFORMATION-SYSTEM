const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../auth/user_auth');
const inventory_auth = require("../midlleware/inventory")



router.get('/get-inventory' , async (req, res) => {
    try {
        const inventory = await prisma.inventory.findMany({});
        if (!inventory || inventory.length === 0) {
            res.status(404).json({ 'records': { "inventory": [], "success": true } });
            return;
        } else {
            res.status(200).json({ 'records': { "inventory": inventory, "success": true } });
            return;
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})

module.exports = router;