const user = require('../models/user')

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/form', (req, res) => {
        user.getUsers((err, data) => {
            if (!err) {
                res.render('form', {
                    data: data
                })
            } else {
                throw err
            }
        })
    })

    app.post('/users', (req, res) => {
        var puntosGrado
        //const nivel

        function grado(grado) {
            if (grado == 'doctor' || grado == 'maestro') {
                return 1
            } else
                return 0
        }

        console.log(puntosGrado)

        function nivel(grado, articulos, libros, investigacion, tesis) {
            if (grado > 1 && articulos > 10 || libros > 2 && investigacion > 2 && tesis > 4) {
                return 'nivel 3'
            } if (grado > 1 && articulos > 6 && libros > 1 && investigacion > 1 || tesis > 2) {
                return 'nivel 2'
            } if (grado == 0 && articulos > 3 && libros > 0 || investigacion > 1 && tesis > 0) {
                return 'nivel 1'
            } else {
                return 'sin clasificar'
            }
        }
        var clasificacion
        clasificacion = nivel(puntosGrado, req.body.articulos, req.body.libros, req.body.investigacion, req.body.tesis)
        const userData = {
            id: null,
            nombre: req.body.nombre_persona,
            nivel: clasificacion

        }

        user.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.redirect('/')
                return true
            } else
                return false

        })
    })


}

