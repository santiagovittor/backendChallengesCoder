const fs = require('fs');

const pathToProducts = './files/productos.json';

class ProductsManager {
    add = async (product) => {
        if (fs.existsSync(pathToProducts)) {
            try {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8')
                let products = JSON.parse(data)
                if (products.length === 0) {
                    product.id = 1;
                    products.push(product);
                    await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                    return { status: "success", message: "First product registered", id: product.id }
                }
                product.id = products[products.length - 1].id + 1;
                products.push(product);
                await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2))
                return { status: "success", message: "Product registered", id: product.id }

            }
            catch (error) {
                return { status: "error", message: error }
            }
        }
        else {
            try {
                product.id = 1;
                await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2))
                return { status: "success", message: "First product registered." }
            }
            catch (err) {
                return { status: "Error", error: error }
            }
        }
    }
    getAll = async () => {
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data)
            if (products.length === 0) {
                return { status: "error", message: "No products found." }
            }
            return { status: "success", payload: products }
        }

    }
    getById = async (id) => {
        if (fs.existsSync(pathToProducts)) {
            let data = await fs.promises.readFile(pathToProducts, 'utf-8')
            let products = JSON.parse(data)
            let productByID = products.find(p => p.id === id)
            if (productByID) return { status: "success", product: productByID }
            else return { status: "error", message: "Product not found." }
        }
    }
    deleteById = async (id) => {
        try {
            if (!id) return { status: "error", message: "ID needed" }
            if (fs.existsSync(pathToProducts)) {
                let data = await fs.promises.readFile(pathToProducts, 'utf-8')
                let products = JSON.parse(data)
                let newProducts = products.filter(product => product.id !== id)
                if (newProducts.length === products.length) {
                    return { status: 'error', message: "Can't find the product ID." }
                }
                await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts, null, 2))
                return { status: 'success', message: "Product deleted." }
            }

        } catch (error) {
            return { status: 'error', message: error }
        }


    }
    deleteAll = async () => {
        if (fs.existsSync(pathToProducts)) {
            let newProducts = [];
            await fs.promises.writeFile(pathToProducts, JSON.stringify(newProducts))
            return { status: "success", payload: "Products deleted succesfully." }
        }

    }


}

module.exports = ProductsManager;