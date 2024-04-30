const express = require('express');
const router = express.Router();
const { PrismaClient, Role } = require('@prisma/client')
const prisma = new PrismaClient();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




const dotenv = require('dotenv');

dotenv.config({ path: '.env' })
const JWT_SECRET = process.env.JWT_SECRET






router.post('/login', async (req, res) => {
    try {
        const { error } = loginvalidation(req.body);
        if (error) {
            return res.status(404).json({ error: error.details[0].message });
        }
        const { name, password } = req.body;
        let staff = await prisma.staff.findFirst({ where: { name: name } });
        if (!staff) {
            return res.status(404).json({ "msg": { "Invalid name or password": { "success": false } } });
        }
        const passwordMatch = bcrypt.compareSync(password, staff.password);
        if (!passwordMatch) {
            return res.status(404).json({ "msg": { "Invalid email or password!": { "success": false } } });
        }
        const token = jwt.sign({ id: staff.id, role: staff.role }, JWT_SECRET);
        res.header('Authorization', 'Bearer ' + token);
        res.status(200).json({ "token": token, "success": true })
    } catch (error) {
        console.log(error);
        res.status(400).json({ "msg": "Internal Server Error" })
    }
});






function loginvalidation(user) {
    const schema = {
        name: Joi.string().required(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}



module.exports = router;