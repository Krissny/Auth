import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "http";


export const getDataFromToken = (request:NextRequest) => {
    try {
        //grab the token
       const token = request.cookies.get("token")?.value || " ";

       // use verify method of jwt to extract info from the toke
       const decodedToken:any= jwt.verify(token, process.env.TOKEN_SECRET!);
       return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}