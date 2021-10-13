import express from "express"
import cors from "cors"
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from "dotenv"
dotenv.config({ path: 'backend/config/config.env' })
import connectDB from "./config/database.js"
import productRoute from "./routes/products.js"
import errorMiddleware from "./middlwares/errors.js"


const app = express()

// Middlewares  

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use(helmet())


// DATABASE CONNECTION
connectDB()


// API ROUTES
app.use('/api/v1', productRoute)

// Middleware to handle errors
app.use(errorMiddleware)

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})

// Handle Unhandled Promise rejection

process.on('unhandledRejection', err =>{
    console.log(`ERROR: ${err.message}`)
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(()=>{
        process.exit(1)
    })
})

