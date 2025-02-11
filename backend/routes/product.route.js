import express from "express";
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post("/", async (req, res) => {
    const product = req.body; // user will send it
    
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product);

    try {
        newProduct.save();
        res.status(201).json({success: true, data: newProduct, message: "New product has been added"})
    } catch (error) {
        console.log("Error in createNewProduct", error);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    if(!id) return res.json(400).json({success: false, message: "ID (params) is required"})
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Deleted " + id})
    } catch (error) {
        console.log("Error in deleteProduct", error);
        res.status(404).json({success: false, message: "Product not found"});
    }
})

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({}).exec();
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in fetching products");
        res.status(500).json({success: false, message: "Server Erro"})
    }
})

router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: `Invalid product ID`});
    }
    try {
        const productFromDB = await Product.findByIdAndUpdate(id, product, {new: true});
        return res.status(200).json({success: true, message: product.name + " updated successfully", data: productFromDB})
    } catch (error) {
        return res.status(500).json({success: false, message: "Server Error"});
    }
})


export default router;