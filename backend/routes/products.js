import {addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from "../controllers/productController.js";
import express from "express"
import { AuthenticateUser } from "../middlwares/auth.js";

const router = express.Router()

router.get("/product/all",getAllProducts)
router.get("/product/:id",getSingleProduct)
router.post("/admin/product/new",AuthenticateUser,addProduct)
router.put("/admin/product/:id",AuthenticateUser,updateProduct)
router.delete("/admin/product/:id",AuthenticateUser,deleteProduct)


export default router