import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest){
    try {
       const userID = await getDataFromToken(request);
       //here we use ,select method to get the data that we want
       const user = await User.findOne({_id:userID}).select("-password"); // -paasword indiacates that I dont want the password
      return NextResponse.json({
        message : "User found",
        data : user
      })
    } catch (error:any) {
       return  NextResponse.json({error : error.message}, {status:400})
    }
}