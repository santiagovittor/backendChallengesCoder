const express = require('express');
const { Server } = require('socket.io')
const ProductManager = require('./managers/productsManager');
const MessageManager = require('./managers/messagesManager')

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
const messageService = new MessageManager();

let log = [];


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

