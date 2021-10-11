import mongoose from "mongoose"

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_LOCAL_URL)
    .then(connect => {
        console.log(`MONGODB CONNECTED WITH HOST: ${connect.connection.host}`);
    })
}

export default connectDB