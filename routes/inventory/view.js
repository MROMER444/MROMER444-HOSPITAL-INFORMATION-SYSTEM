const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../auth/user_auth');
const inventory_auth = require("../midlleware/inventory")


<<<<<<< HEAD
<<<<<<< Updated upstream
<<<<<<< Updated upstream
router.get('/get-inventory',auth , inventory_auth , async (req, res) => {
=======

router.get('/get-inventory' , async (req, res) => {
>>>>>>> Stashed changes
=======

router.get('/get-inventory' , async (req, res) => {
>>>>>>> Stashed changes
=======

router.get('/get-inventory' , async (req, res) => {
>>>>>>> dev_env
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

<<<<<<< HEAD
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> dev_env
module.exports = router;