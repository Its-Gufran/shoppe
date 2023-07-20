import userModel from '../models/userModel.js';
import {comparePassword, hashPassword} from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken'

export const registerController = async(req,res) => {
    try{
        const {name, email, password, phone, address} = req.body;
        //validation
        if(!name){
            return res.send({message: "Name is required"})
        }
        if(!email){
            return res.send({message: "Email is required"})
        }
        if(!password){
            return res.send({message: "Password is required"})
        }
        if(!phone){
            return res.send({message: "Phone is required"})
        }
        if(!address){
            return res.send({message: "Address is required"})
        }
        //check if user already exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered, Please Login ',
            })  
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        }).save();

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registering User',
            error
        })
    }
};

//POST LOGIN
export const loginController = async(req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password'
            })
        }
        //check if user exists
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found, Please Register'
            })
                }        
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:'Invalid Password'
            })
        }
        //token
        const token = JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7 days'});
        res.status(200).send({
            success:true,
            message:'User Logged In Successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,

            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login User',
            error
        })
    }
}

//test controller
export const testController = (req,res) => {
    try{
        res.send("Protected Routes");
        }catch(error){
        console.log(error)
        res.send({error});

        }
};

