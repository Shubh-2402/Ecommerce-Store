import express from "express"
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })
import connectDB from "./config/database.js"
import productRoute from "./routes/products.js"


const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use(helmet())

connectDB()

app.use('/api/v1', productRoute)

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT , ()=>{
    console.log(`Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

