import { NextApiRequest, NextApiResponse } from 'next';
import pool from "../../../../utils/mysql";
import logger from "../../../../utils/logger";
import os from "os";
import apiAuth from '../../../../utils/apiAuth';

const scriptName: string = __filename.slice(__dirname.length + 1);
 
export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(async ( resolve ) => {
        const {
            query: { data },
        } = req;

        if(!apiAuth(req)){
            res.status(403).send("Błędny klucz API");
            return resolve(403);
        }

        if(data instanceof Array){
            logger(`Podano tablicę do parametru (${scriptName})`);

            res.status(503).end("Podano tablicę do parametru");
            return resolve(503);
        }

        const queryData: Array<string> = data.split("&");
        const [ steamId, value ] = queryData;
            
        pool.query(
            'UPDATE `users` SET `coins`=`coins`+? WHERE steamID=?',
            [ parseInt(value), steamId ],
            ( error ) => {
                if(error) {
                    logger(`Błąd zapytania (dodawanie kredytów | klient: ${steamId}, wartość ${value}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                    res.status(404).send(404);
                    return resolve(404);
                } 

                res.status(200).send(200);
                logger(`Pomyślnie dodano kredyty (klient: ${steamId}, wartość ${value}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                return resolve(200);
            }
        );
    })
}