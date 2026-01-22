import { asyncHandler, BadRequestError, NotFoundError } from "../utils/asyncHandler.js";
import validator from "validator";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({userId: id}, process.env.JWT_SECRETE, {expiresIn: "1d"});
}

export const register = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;

    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
        throw new BadRequestError("All field are required!!!")
    }

    if (!validator.isEmail(email)) {
        throw new BadRequestError("Invalid Email!!!");
    }

    if (!validator.isStrongPassword(password)) {
        throw new BadRequestError("Password is too weak!!!")
    }

    const ifExist = await User.findOne({email})
    if(ifExist) {
        throw new BadRequestError("Email already in use!!!")
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, 
        email, 
        password: hashedPass
    })

    const token = generateToken(user._id);

    const userWithoutPass = await User.findById(user._id).select("-password")

    res.status(201).json({
        success: true,
        message: "Welcome!",
        user: {...userWithoutPass.toObject(), token}
    })
})


export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
        throw new BadRequestError("All field are required!!!")
    }

    if (!validator.isEmail(email)) {
        throw new BadRequestError("Invalid Email!!!");
    }

    const user  = await User.findOne({email})
    if(!user) {
        throw new NotFoundError("You have to signup first!!!")
    }

    const check = await bcrypt.compare(password, user.password)
    if(!check) {
        throw new BadRequestError("Invalid Password")
    }

    const token = generateToken(user._id);

    const userWithoutPass = await User.findById(user._id).select("-password")

    res.status(201).json({
        success: true,
        message: "Welcome Back!",
        user: {...userWithoutPass.toObject(), token}
    })
})