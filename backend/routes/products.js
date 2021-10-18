import {addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from "../controllers/productController.js";
import express from "express"
import { AuthorizeRoles, AuthorizeUser } from "../middlwares/auth.js";

const router = express.Router()

router.get("/product/all",getAllProducts)
router.get("/product/:id",getSingleProduct)
router.post("/admin/product/new",AuthorizeUser,AuthorizeRoles('admin'),addProduct)
router.put("/admin/product/:id",AuthorizeUser,AuthorizeRoles('admin'),updateProduct)
router.delete("/admin/product/:id",AuthorizeUser,AuthorizeRoles('admin'),deleteProduct)


export default router