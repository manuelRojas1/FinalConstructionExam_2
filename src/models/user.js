
const dbconnection = require('./connection');
const connection = dbconnection();
let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query('Select * from avistamiento ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows)
                }
            }

        )
    }
}


userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query('INSERT INTO AVISTAMIENTO SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            })
    }
}


userModel.deleteUser = (id, callback) => {
    if (connection) {
        const sql = 'SELECT * FROM avistamiento WHERE id= ${connection.escape(id)}'
        connection.query(sql, (err, row) => {
            if (row) {
                let sql = 'DELETE FROM avistamiento id=${id}'
                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err
                    } else {
                        callback(null, {
                            msg: 'deleted'
                        })
                    }
                })

            } else {
                callback(null, {
                    msg: 'not exists'
                })
            }
        })
    }
}





module.exports = userModel;