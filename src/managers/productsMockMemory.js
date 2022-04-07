const ProductsManagerMemory = require('./productsManagerMemory.js')
const faker = require('faker')

const {dataType} = faker;

class ProductsMockMemory extends ProductsManagerMemory {
    constructor(){
        super();
    }

    generateProducts = (cant = 5) =>{
        const newProducts = [];
        for(let i=0; i<cant; i++){
            newProducts.push({
                title:faker.commerce.productName(),
                price:faker.commerce.price(),
                thumbnail:faker.image.animals(),
                id:faker.datatype.uuid()
            })
        }
        return newProducts;
    }

    
}

module.exports = ProductsMockMemory;