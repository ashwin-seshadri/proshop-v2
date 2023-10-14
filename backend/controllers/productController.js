import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc   Fetch all products
//@route  GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

//@desc   Fetch a product
//@route  GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        return res.json(product);
    }

    res.status(404);
    throw new Error("Resource not found");
});

//@desc   Create a product
//@route  POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name : 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        countInStock: 0,
        numReviews: 0,
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.log(`Error creating product: ${error}`);
        res.status(500);
        throw new Error("Unexpected error creating product");
    }
});

//@desc   Update a product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        try {
            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.log(`Error updating product: ${error}`);
            res.status(500);
            throw new Error("Unexpected error updating product");
        }
        
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
        try {
            await Product.deleteOne({_id: req.params.id});
            res.status(200).json({ message: 'Product deleted'});
        } catch (error) {
            console.log(`Error deleting product: ${error}`);
            res.status(500);
            throw new Error("Unexpected error deleting product");
        }
        
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };