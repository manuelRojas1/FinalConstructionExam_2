const express=require('express');
const app=express();

const morgan=require('morgan');
const bodyParser=require('body-parser')
const path = require('path');
//const routes =require('./routes/userRoutes')
//settings
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'./views/index'));
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './static')))
//app.use('/',routes)
//routes
require('./routes/userRoutes')(app);


//static files

app.listen(app.get('port'),()=>{
    console.log('the magic on port 3000')
})
