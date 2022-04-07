const express = require('express');
const { Server } = require('socket.io')
const ProductManager = require('./managers/productsManagerFs.js');
const MockProductManager = require('./managers/productsMockMemory')
const MessageManager = require('./managers/messagesManagerFs.js')
const handlebars = require('express-handlebars')
const normalizr = require('normalizr')
const { normalize, denormalize, schema } = normalizr



// const productsRouter = require('./routes/productsRouter')

const app = express();
const PORT = 8080;
const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Listening on port 8080.')
})
const io = new Server(server);


app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//services
const productService = new ProductManager();
const mockProductService = new MockProductManager();
const messageService = new MessageManager();


let log = [];

 app.engine('handlebars',handlebars.engine());
 app.set('views',__dirname+'/views/handlebars');
 app.set('view engine','handlebars');


app.get('/api/productos-test', async (req,res)=>{
    let products = await mockProductService.generateProducts();
    res.render('products',{
        products:products
    })

})



app.get('/getProductById/:id', async (req,res)=>{
    let searchId = parseInt(req.params.id);
    let productToFind = await productService.getById(searchId)
    res.send(productToFind)
})

app.delete('/deleteProductById/:id', async (req,res)=>{
    let idToDelete = parseInt(req.params.id);
    let productToDelete = await productService.deleteById(idToDelete)
    res.send(productToDelete)
})

app.delete('/deleteAll', async (req,res)=>{
    let deleteAll = await productService.deleteAll();
    res.send(deleteAll)
})


//socket

io.on('connection', async socket => {
    console.log('Cliente conectado');

    let products = await productService.getAll();
    io.emit('productLog', products)

    socket.on('sendProduct', async data => {
        await productService.add(data)
        let products = await productService.getAll();
        io.emit('productLog', products)
    })
    socket.broadcast.emit('newUser')


    socket.on('message', async data => {
        await messageService.add(data)
        let messages = await messageService.getAll();
        io.emit('log', messages);
    })
    socket.on('registered', data => {
        socket.emit('log', log);
    })


})



// app.use('/products',productsRouter)

//Enable the following 3 lines in order to render using Handlebars
// app.engine('handlebars',handlebars.engine());
// app.set('views',__dirname+'/views/handlebars');
// app.set('view engine','handlebars');

// Enable the following 2 lines in order to render using Pug
// app.set('views',__dirname+'/views/pug')
// app.set('view engine','pug');

// Enable the following 2 lines in order to render using EJS
// app.set('views',__dirname+'/views/EJS');
// app.set('view engine','ejs');

