const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API FOR HOSPITAL INFORMATION SYSTEM',
    description: 'API for Hospital Information System. The HIS API provides a secure and efficient interface for managing hospital operations, including patient data, appointment scheduling'
  },
  // Remove the scheme from the host
  host: 'his-50kt.onrender.com',
  // Specify the schemes separately
  schemes: ['https'], // or ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
});
