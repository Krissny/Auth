import {connect} from "@/dbConfig/dbConfig"
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";
import { NextRequest} from "next/server";
import { NextResponse} from "next/server";
import jwt from "jsonwebtoken"

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email, password} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status : 400})
        }
        
        //check  if password correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error : "Invalid password"}, {status: 400})
        }
        
        //create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }
        //create the token

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"} )

        const response = NextResponse.json({
            message:"Login succesful",
            success : true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}