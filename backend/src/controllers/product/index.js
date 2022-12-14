const productController = require('./product.controller')

exports.getProducts = async (req, res) => {
    try {
        console.log(req.query);
        res.json(await productController.getProducts(req.auth, req.query))
    } catch (e) {
        throw new Error(e)
    }
}

exports.addProduct = async (req, res) => {
    try {
        res.json(await productController.addProduct(req.body))
    } catch (e) {
        res.json(e)
    }
}

exports.getNPages = async (req, res) => {
    try {
        res.json(await productController.getNpages())
    } catch (e) { res.json(e) }
}

exports.updateProduct = async (req, res) => {
    try {
        res.json(await productController.updateProduct(req.body))
    } catch (e) {
        throw new Error(e)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        res.json(await productController.deleteProduct(req.params.id))
    } catch (e) {
        throw new Error(e)
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        if (req.params.id) res.json(await productController.getOneProduct(req))
        else if (req.headers.title) res.json(await productController.getOneProduct(req.headers.title, false))
    } catch (e) {
        throw new Error(e)
    }
}

exports.getProductsStartsWith = async (req, res) => {
    try {
        res.json(await productController.getProductsStartsWith(req.query.startsWith))
    } catch (e) { new Error(e) }
}

exports.setLikeDislike = async (req, res) => {
    try {
        res.send(await productController.setLikeDislike(req.params.slug, req.auth))
    } catch (e) { res.json(e) }
}

exports.getUserProducts = async (req, res) => {
    try {
        res.json(await productController.getUserProducts(req.body))
    } catch (e) { res.json(e) }
}