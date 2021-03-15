//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import SteamStrategy from "passport-steam";

const dev: boolean = process.env.NODE_ENV === "development";
const host: string | undefined = dev ? "http://localhost" : process.env.NEXT_PUBLIC_DOMAIN;

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