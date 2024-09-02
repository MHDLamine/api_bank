const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bank'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL: ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL avec ID ' + connection.threadId);
});

module.exports = connection;
