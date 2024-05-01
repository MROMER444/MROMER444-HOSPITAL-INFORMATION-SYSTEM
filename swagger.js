const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API FOR HOSPITAL INFORMATION SYSTEM',
    description: 'api for Hospital Information SystemThe HIS API provides a secure and efficient interface for managing hospital operations, including patient data, appointment scheduling'
  },
  host: 'https://his-50kt.onrender.com',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
})