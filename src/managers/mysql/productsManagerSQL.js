const options = require('../../database/options/mysqlconfig.js')
const knex = require('knex')
const database = knex(options);

const createProductsTable = async () => {

    await database.schema.createTable('products', table => {
        table.increments('id');
        table.string('title');
        table.integer('price');
        table.string('thumbnail');
    }).then(console.log('Products Table Created'))
        .catch((err) => console.log(err))

}



class ProductsManager {


    add = async (product) => {

        if (await database.schema.hasTable('products') === true) {
            try {
                await database('products').insert(product)
                    .then(console.log(`${product.title} added to database.`))
                    .catch((err) => console.log(err))
                return { status: 'Success', message: 'Product added.' }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }

        await createProductsTable();
        await database('products').insert(product)
            .then(console.log(`${product.title} added to database.`))
            .catch((err) => console.log(err))
        return { status: 'Success', message: 'Product added.' }


    }


    getAll = async () => {

        if (await database.schema.hasTable('products') === true) {
            try {
                let data = await database.from('products').select('*')
                    .then(data => {
                        let products = JSON.parse(JSON.stringify(data))
                        return products
                    })
                    .catch((err) => { console.log(err) })
                return { status: 'Success', payload: data }
            }
            catch (error) {
                return { status: 'Error', error: error }
            }
        }
        else {
            return { status: 'Error', payload: 'No Products yet.' }
        }


    }


    getById = async (id) => {
        if (await database.schema.hasTable('products') === true) {
            try {
                let product = await database.from('products').select('*').where('id', '=', id)
                    .then(data => {
                        let searchedItem = JSON.parse(JSON.stringify(data))
                        return searchedItem
                    })
                    .catch((err) => { console.log(err) })
                if (product.length === 1) return { status: "Success", payload: product }
                else return { status: "error", message: "Product not found." }

            }
            catch (err) {
                return { status: "Error", error: err }
            }
        }
    }


    deleteById = async (id) => {
        try {
            if (!id) return { status: "error", message: "ID needed" }
            if (await database.schema.hasTable('products') === true) {
                let products = await database.from('products').select('*')
                await database.from('products').where('id', '=', id).del()
                let newProducts = await database.from('products').select('*')
                if (newProducts.length === products.length) {
                    return { status: 'error', message: "Can't find the product ID." }
                }
                return { status: 'success', message: "Product deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }


    }


    deleteAll = async () => {
        if (await database.schema.hasTable('products') === true) {
            await database.schema.dropTable('products')
                .then(() => console.log('Products table deleted.'))
                .catch((err) => console.log(err))
            return { status: "success", payload: "Products deleted succesfully." }
        }

    }


}

module.exports = ProductsManager;