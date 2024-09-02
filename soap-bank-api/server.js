const soap = require('strong-soap').soap;
const http = require('http');
const fs = require('fs');
const bankService = require('./services/bankService');

const service = bankService.BankService;
const xml = fs.readFileSync('wsdl/service.wsdl', 'utf8');

const server = http.createServer((req, res) => {
    res.statusCode = 404;
    res.end('404: Not Found');
});

server.listen(8000, () => {
    console.log('Serveur SOAP lancé sur le port 8000');
});

const soapServer = soap.listen(server, '/wsdl', service, xml);
