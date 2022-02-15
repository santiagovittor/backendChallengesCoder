const express = require('express');
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/productsRouter')

const app = express()
const server = app.listen(8080,()=>{
    console.log('Listening on port 8080.')
})

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/products',productsRouter)

//Enable the following 3 lines in order to render using Handlebars
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views/handlebars');
app.set('view engine','handlebars');

// Enable the following 2 lines in order to render using Pug
// app.set('views',__dirname+'/views/pug')
// app.set('view engine','pug');

// Enable the following 2 lines in order to render using EJS
// app.set('views',__dirname+'/views/EJS');
// app.set('view engine','ejs');



app.get('/',(req,res)=>{
    res.render('home')
})

