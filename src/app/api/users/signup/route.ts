import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";
import { NextRequest} from "next/server";
import { NextResponse} from "next/server";

connect();

//here we gonna import the connect function we created in dbconfig
//Now we need data of the user
// like in express we have request and response here also

//handling post req
export  async function POST(request: NextRequest){
    try {
        //how are we going to grab data from body
       const reqBody = await request.json()
       //destructing
       const {username,email, password} = reqBody
       console.log(reqBody) // for debugging puposes
       
       //Validation
       const user = await User.findOne({email})
       if(user){
            return NextResponse.json({error:"User already exists"}, {status:400})
       }
       
       //hash password
       const salt = await bcryptjs.genSalt(10); //random piece of data with 10 rounds
       const hashedPassword = await bcryptjs.hash(password, salt)

       const newUser = new User({
            username,
            email,
            password : hashedPassword
       })

       const savedUser = await newUser.save();
       console.log(savedUser);

       return NextResponse.json({
        message : "User created sucessfully",
        success : true,
        savedUser
       })

        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}