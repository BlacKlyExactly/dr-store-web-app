import { NextPageContext } from "next";
import nextCookie from "next-cookies";
import jwt from "jsonwebtoken";

const useUser = ( ctx: NextPageContext ) => {
    const { token } = nextCookie(ctx);
    const isLoged: boolean = token ? true : false;
    const { COOKIES_SECRET } = process.env;

    let data: UserData | string | {};

    jwt.verify(token, COOKIES_SECRET, ( err, decoded: UserData ) => {
        if(err || !decoded) return;
        data = decoded;
    })
    
    return { token, isLoged, data };
}

export interface UserData {
    name: string,
    avatar: string, 
    steamId: string
}

export default useUser;