const express = require('express');
const productsRouter = express.Router();
const ProductsManager = require('../managers/productsManager')
const productService = new ProductsManager();
const uploader = require('../services/Upload')


productsRouter.get('/', async (req,res)=>{
    let productos = await productService.getAll()
    res.send(productos.payload)
})

productsRouter.get('/:id', async (req,res)=>{
    let searchId = parseInt(req.params.id);
    let productToFind = await productService.getById(searchId)
    res.send(productToFind)
})

productsRouter.post('/',uploader.single('file'), async (req,res)=>{
    let product = req.body;
    let file = req.file;
    if(!file) return res.status(500).send({error:"Couldn't upload file"});
    product.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename;
    await productService.add(product).then(result=>res.send(result))
})

productsRouter.delete('/:id', async (req,res)=>{
    let idToDelete = parseInt(req.params.id);
    let productToDelete = await productService.deleteById(idToDelete)
    res.send(productToDelete)
})

module.exports = productsRouter;