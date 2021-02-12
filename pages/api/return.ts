import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from "cookie";
import passport from "passport";
import SteamID from "steamid";
import jwt from "jsonwebtoken";
import logger from "../../utils/logger";
import pool from "../../utils/mysql";

export default ( req: NextApiRequest, res: NextApiResponse ) => {
    passport.authenticate('steam', ( err: any, user: any ) => {
        err && logger(`Błąd zapisywania jwt: ${JSON.stringify(err)}`);

        const id: SteamID = new SteamID(user.id);
        
        const steamId: string = id.getSteam2RenderedID(true);
        const name: string = user.displayName;
        const avatar: string = user.photos[2].value;

        const data = {
            name,
            avatar,
            steamId
        }

        pool.query(
            'INSERT INTO `users` (name, steamID, equipment, coins) VALUES(?, ?, "", 0)',
            [ name, steamId ],
            ( error ) => {
                if(error) {
                    console.log(error);
                    logger(`Błąd zapytania (dodawanie użytkownika do bazy | klient: ${steamId}) ${JSON.stringify(error)}`);
                    return;
                } 

                logger(`Pomyślnie dodano użytkownika do bazy (klient: ${steamId})`);
            }
        );

        pool.query(
            'INSERT INTO `daily` (steamID, days) VALUES(?, "0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0")',
            [ steamId ],
            ( error ) => {
                if(error) {
                    console.log(error);
                    logger(`Błąd zapytania (dodawanie użytkownika do bazy | klient: ${steamId}) ${JSON.stringify(error)}`);

                    return;
                } 

                logger(`Pomyślnie dodano użytkownika do bazy (klient: ${steamId})`);
            }
        );
        
        const options: CookieSerializeOptions = {
            httpOnly: true,
            path: "/"
        }

        const secret: string | undefined = process.env.COOKIES_SECRET;
        const accessToken: string | undefined = secret && jwt.sign(data, secret, { expiresIn: 604800 });

        if(!accessToken) return;
    
        res.setHeader('Set-Cookie', serialize("token", accessToken, options));
        res.redirect('/');
    })( req, res )
}
