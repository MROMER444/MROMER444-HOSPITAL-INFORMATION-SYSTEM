const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'HIS API',
    description: 'simple api for Hospital Information System'
  },
  host: 'localhost:5000',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
})