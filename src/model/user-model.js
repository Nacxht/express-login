const config = require('./db')
const mysql = require('mysql');

const pool = mysql.createPool(config);
pool.on('error', (err) => {
    console.error(err);
});


// Get user data
const getUser = (username) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
                `SELECT * FROM user WHERE username = '${username}';`,
                (err, results) => {
                    connection.release();

                    if (err) throw err;
                    resolve(results);
                }
            );
        });
    });
};


module.exports = {
    getUser
}