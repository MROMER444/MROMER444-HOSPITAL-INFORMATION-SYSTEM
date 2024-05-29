const express = require("express");

const app = express()
require('dotenv').config();

const readPatient = require("./routes/patients/read");
const createPatient = require("./routes/patients/create");
const updatePatient = require("./routes/patients/update");
const deletePatient = require("./routes/patients/delete");
const createstaff = require("./routes/administration/staff");
const creatediagnostic = require("./routes/administration/diagnostic");
const inventory = require("./routes/administration/inventory");
const Pharmacy = require("./routes/administration/pharmacy");
const inventoryview = require("./routes/inventory/view");
const auth = require("./routes/auth/login");



app.use(express.json());

app.use('/api/patient', readPatient);
app.use('/api/patient', createPatient);
app.use('/api/patient', updatePatient);
app.use('/api/patient', deletePatient);
app.use('/api/staff', createstaff);
app.use('/api/diagnostic', creatediagnostic);
app.use('/api/inventory', inventory);
app.use('/api/Pharmacy', Pharmacy);
app.use('/api/inventoryview', inventoryview);
app.use('/api', auth);

if (app.get('env') === 'development') {
    process.env.DATABASE_URL = process.env.DEV_DATABASE_URL;
} else {
    process.env.DATABASE_URL = process.env.DATABASE_URL;
}



if (app.get('env') === 'development'){
    process.env.DATABASE_URL = process.env.DEV_DATABASE_URL
    console.log("Runing on development env");
}else{
    process.env.DATABASE_URL = process.env.DATABASE_URL                 
    console.log("Runing on prod env");
}


console.log('Environment:', app.get('env'));



const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on port', PORT));