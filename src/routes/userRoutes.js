const user = require('../models/user')

module.exports = function (app) {
    app.get('/', (req, res) => {
        user.getUsers((err, data) => {
            if (!err) {
                res.render('index', {
                    news: data
                })
            } else {
                throw err
            }
        })
    })

    app.post('/users', (req, res) => {
        const userData = {
            id: null,
            nombre_persona: req.body.nombre_persona,
            nombre_ave: req.body.nombre_ave,
            lugar: req.body.lugar,
            cantidad: req.body.cantidad
        }

        user.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.redirect('/user')
                return true
            } else
                return false

        })
    })

    app.delete('/users/:id', (req, res) => {
        user.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'deleted' || data.msg === 'not exists') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'error'
                })
            }
        })

    })


}

