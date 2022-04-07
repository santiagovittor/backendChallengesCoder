const faker = require('faker')

const {dataType} = faker;

class ProductsManagerMemory {
    constructor(){
        this.products=[];
    }
    
    getAll = () =>{
        return this.products
    }

    getById = (id) =>{
        let element = this.products.find(el=>el.id===id)
        return element? element : null
    }

    guardar = (product) =>{
        product.id = dataType.uuid();
        this.products.push(product)
        return user;
    }

    actualizar = (id,product) =>{
        let index = this.products.findIndex(el=>el.id===id)
        product.id = this.products[index].id
        this.products[index] = product;
    }

    borrar = (id) =>{
        let index = this.products.findIndex(el=>el.id===id)
        this.products.splice(index,1)
        return true;
    }

}

module.exports = ProductsManagerMemory;