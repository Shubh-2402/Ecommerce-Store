import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"

export const registerUser = async(req,res,next)=>{

    const {name,email,password} = req.body

    try{

        const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id: "smiling-man",
                url:"https://res.cloudinary.com/dc5j574uj/image/upload/v1633580504/samples/people/smiling-man.jpg"
            }
        })

        const token = user.getJwtToken()

        res.status(201).json({
            success:true,
            token
        })
    }catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}