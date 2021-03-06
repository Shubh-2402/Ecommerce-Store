import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js"
import APIFeatures from "../utils/apiFeatures.js"



// GET ALL PRODUCTS  --> api/v1/product/all

export const getAllProducts = async(req,res,next)=>{

    try {

        const resultsPerPage = 4
        const productCount = await Product.countDocuments()

        const apiFeatures = new APIFeatures(Product.find(),req.query)
                            .search()
                            .filter()
                            .pagination(resultsPerPage)

        const products = await apiFeatures.query

        res.status(200).json({
            success:true,
            count:products.length,
            productCount,
            products
        })
    }catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
    
}

// GET SINGLE PRODUCT  --> api/v1/product/:id

export const getSingleProduct = async(req,res,next)=>{


    try{
        const product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }

        res.status(200).json({
            success:true,
            product
        })
    }catch (error){
        res.status(400).json({
            success:false,
            error
        })
    }

}

// ADD NEW PRODUCTS --> api/v1/admin/product/new

export const addProduct = async(req,res,next)=>{

    try {

        req.body.user = req.user.id 
        
        const newProduct = await Product.create(req.body)

        res.status(201).json({
            success:true,
            newProduct
        })    
    }catch (error){
        res.status(400).json({
            success:false,
            error
        })
    }

    
}


// UPDATE A PRODUCT --> api/v1/admin/product/:id
export const updateProduct = async(req,res,next)=>{

    try {
        let product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }
        
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            product
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error
        })
    }

}


// DELETE A PRODUCT --> api/v1/admin/product/:id

export const deleteProduct = async(req,res,next)=>{

    try {

        const product = await Product.findById(req.params.id)

        if(!product){
            return next(new ErrorHandler("Product not found",404))
        }

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success:true,
            message:"Product Deleted"
        }) 
    }catch (error){
        res.status(400).json({
            success:false,
            error
        })
    }

}