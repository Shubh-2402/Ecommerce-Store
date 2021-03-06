import User from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"
import sendToken from "../utils/jwtToken.js"


// Register User --> /api/v1/register
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

        sendToken(user,200,res)

    }catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

//Login User --> /api/v1/login

export const loginUser = async(req,res,next) =>{

    const {email,password} = req.body

    try{

        if(!email || !password){
            return next(new ErrorHandler("Please enter email and password",400))
        }
    
        const user = await User.findOne({email}).select("+password")
    
        if(!user){
            return next(new ErrorHandler("Invalid email or password",401))
        }

        const isValidPassword = await user.comparePassword(password)
        // console.log(isValidPassword);

        if(!isValidPassword){
            return next(new ErrorHandler("Invalid email or password",401))
        }

        sendToken(user,200,res)

    }catch (error){
        res.status(400).json({
            success:false,
            error
        })
    }

}

//Logout User --> /api/v1/logout

export const logoutUser = async(req,res,next) =>{

    try{

        res.cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true
        })

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }

    
}