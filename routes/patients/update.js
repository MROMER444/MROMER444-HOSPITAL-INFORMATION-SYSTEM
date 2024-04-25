const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



router.put('/update-patient/:id', async (req, res) => {
    try {
        const { error } = updateValidation(req.body);
    if (error) {
        return res.status(400).json({ 'error': error.details[0].message });
    }
    const { id } = req.params;
    const  patientId  = parseInt(id);
    let patient = await prisma.patient.findFirst({where: {id: patientId}});
    if(!patient){
        return res.status(404).json({ "error": "patient with this Id not found!" })
    }
    patient = await prisma.patient.findFirst({where: {number: req.body.number}}); //TODO
    if(patient){
        return res.status(404).json({ "error": "can't update, another patient with this number" })
    }
    const { name, number, address, birthDate, emergencycontact, gender, image } = req.body;
    patient = await prisma.patient.update({
        where:{
            id: patientId,
        },
        data:{
            name:               name,
            number:             number,
            address:            address,
            birthDate:          birthDate,
            emergencycontact:   emergencycontact,
            gender:             gender,
            image:              image
        },
    })
    if (!patient) {
        res.status(404).json({ "records": { "message": "can't update this patient" }, "success": false })
    }else{
        res.status(200).json({ "records": { "patient": patient }, "success": true });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Internal Server Error" });   
    }

})







function updateValidation(user) {
    const schema = {
        name: Joi.string().min(3).max(20),
        number: Joi.string().min(11).max(11),
        address: Joi.string(),
        birthDate: Joi.date(),
        emergencycontact: Joi.string().min(11).max(11),
        gender: Joi.string().valid('MALE', 'FEMALE'),
        image: Joi.string().allow(null)
    }
    return Joi.validate(user, schema);
}


module.exports = router;