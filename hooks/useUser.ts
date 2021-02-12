import { NextPageContext } from "next";
import nextCookie from "next-cookies";
import jwt from "jsonwebtoken";

const useUser = ( ctx: NextPageContext ) => {
    const { token } = nextCookie(ctx);
    const accessToken: string | null = token ? token : null;
    const isLoged: boolean = token ? true : false;

    const { COOKIES_SECRET } = process.env;

    const data: UserData | null | string | {} | undefined = 
        ( COOKIES_SECRET && accessToken ) ? jwt.verify(accessToken, COOKIES_SECRET) : null;
    
    return { accessToken, isLoged, data };
}

export interface UserData {
    name: string,
    avatar: string, 
    steamId: string
}

export default useUser;