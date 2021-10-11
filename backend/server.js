import express from "express"
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })

const app = express()
app.use(cors())
app.use(morgan("tiny"))
app.use(helmet())

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(process.env.PORT , ()=>{
    console.log(`Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

