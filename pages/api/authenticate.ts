//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import SteamStrategy from "passport-steam";

const dev: boolean = process.env.NODE_ENV === "development";
<<<<<<< HEAD
const host: string | undefined = dev ? "http://localhost:3000" : process.env.DOMAIN;
=======
const host: string | undefined = dev ? "http://localhost" : process.env.NEXT_PUBLIC_DOMAIN;
>>>>>>> e9c9b0856222a4c673c5310a0ec3b4e04820c07c

const data = {
    returnURL: `${host}:3000/api/return/`,
    realm: `${host}:3000/`,
    apiKey: process.env.WEB_API_KEY
}

passport.serializeUser(( user: any, done: any ) => {
    done(null, user);
});
  
passport.deserializeUser(( obj: any, done: any ) => {
    done(null, obj);
});

passport.use(
    new SteamStrategy(data, ( identifier: any, profile: any, done: any ) => {
        profile.identifier = identifier;    
        done(null, profile);
    })
);

export default passport.authenticate('steam', { failureRedirect: "/authenticate" });