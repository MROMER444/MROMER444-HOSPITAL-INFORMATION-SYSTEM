const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/create-inventory', async (req, res) => {
    try {
        const { error } = inventoryValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }

        const { type, name, unit, quantity, price, code } = req.body;
        const total = quantity * price;

        const inventory = await prisma.inventory.create({
            data: {
                type,
                name,
                unit,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                total: parseInt(total),
                code
            }
        });

        if (!inventory) {
            return res.status(404).json({ "error": "Failed to create inventory" });
        } else {
            return res.status(201).json({ "records": { "inventory": inventory }, "success": true });
        }

    } catch (error) {
        return res.status(500).json({ "msg": "Internal Server Error" });
    }
})


router.put('/update-inventory/:id', async (req, res) => {
    try {
        const { error } = inventoryValidation(req.body);
        if (error) {
            return res.status(400).json({ 'error': error.details[0].message });
        }
        const { id } = req.params;
        const inventoryId = parseInt(id);
        let inventory = await prisma.inventory.findFirst({ where: { id: inventoryId } });
        if (!inventory) {
            return res.status(404).json({ "error": "inventory with this Id not found!" })
        }
        const { type, name, unit, quantity, price, code } = req.body;
        const total = quantity * price;
        inventory = await prisma.inventory.update({
            where: {
                id: inventoryId,
            },
            data: {
                type,
                name,
                unit,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                total: parseInt(total),
                code
            },
        })
        if (!inventory) {
            res.status(404).json({ "records": { "message": "can't update this inventory" }, "success": false })
        } else {
            res.status(200).json({ "records": { "inventory": inventory }, "success": true });
        }
    } catch (error) {
        res.status(500).json({ "msg": "Internal Server Error" });
    }

})

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


function inventoryValidation(user) {
    const schema = {
        type: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        unit: Joi.string().required(),
        quantity: Joi.string().required(),
        price: Joi.number().required(),
        total: Joi.string().allow(''),
        code: Joi.string().required(),   
    }
    return Joi.validate(user, schema);
}




module.exports = router;