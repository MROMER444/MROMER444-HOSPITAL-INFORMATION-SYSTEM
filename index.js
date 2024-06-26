const express = require("express");
const cors = require('cors');

const app = express()
app.use(cors());


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



const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Listening on port', PORT));