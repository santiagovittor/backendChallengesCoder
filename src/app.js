const express = require('express');
const productsRouter = require('./routes/productsRouter')

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/products',productsRouter)
app.use(express.static(__dirname+'/public'))


const server = app.listen(8080,()=>{
    console.log('Listening on port 8080.')
})

