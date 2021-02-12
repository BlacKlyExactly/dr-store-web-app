import passport from "passport";
import SteamStrategy from "passport-steam";

const dev: boolean = process.env.NODE_ENV === "development";
const host: string | undefined = dev ? "http:/localhost:3000" : process.env.DOMAIN;

passport.serializeUser(( user: any, done: any ) => {
    done(null, user);
});
  
passport.deserializeUser(( obj: any, done: any ) => {
    done(null, obj);
});

passport.use(
    new SteamStrategy({
        returnURL: `${host}/api/return/`,
        realm: `${host}/`,
        apiKey: process.env.WEB_API_KEY
    },
    ( identifier: any, profile: any, done: any ) => {
        profile.identifier = identifier;    
        done(null, profile);
    }
));


export default passport.authenticate('steam', { failureRedirect: "/authenticate" });