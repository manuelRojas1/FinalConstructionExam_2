const chaiHttp = require('chai-http');
const chai = require('chai')
const assert = require('chai').assert;
const user = require('../src/models/user.js');
const userRout = require('../src/routes/userRoutes')
const dbcn = require('../src/models/connection');
const db = dbcn()
chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('getuser()', function () {
  it('should the data of the getUser() method be an array', function (done) {
    user.getUsers((e, r) => {
      assert.typeOf(r, "array");
      done()
    });
  });

  it('probando el tamaño del array de los datos', async function (done) {
    user.getUsers((e, r) => {
      let tam = r.length;
      console.log(tam)
      assert.equal(tam, 1, "Tamaño 1")
      done();
    })
  })



  it('probando la consulta', function (done) {
    let consulta = 'SELECT * from archivo '
    user.getUsers((e, r) => {
      db.query(consulta,
        (e, r) => {
          if (e) {
            done(e)
            return
          }
          assert.equal('SELECT * from archivo', consulta, 'asdasdas')
          done()
        }
      )
    })
  })

});

/* describe('get all users: ', () => {
  it('should get all users', (done) => {
    chai.request(url)
      .get('/user')
      .end(function (err, res) {
        console.log(res)
        spect(res).to.have.status(200);
        done();
      });
  });
}); */
