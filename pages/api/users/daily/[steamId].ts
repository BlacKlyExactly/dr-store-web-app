import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, RowDataPacket } from "mysql2"
import pool from "../../../../utils/mysql";
import logger from "../../../../utils/logger";
import os from "os";
import apiAuth from '../../../../utils/apiAuth';

const scriptName: string = __filename.slice(__dirname.length + 1);
 
export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(async ( resolve ) => {
        const {
            query: { steamId },
        } = req;

        if(!apiAuth(req)){
            res.status(403).send("Błędny klucz API");
            return resolve(403);
        }

        if(steamId instanceof Array){
            logger(`Podano tablicę do parametru (${scriptName})`);

            res.status(503).end("Podano tablicę do parametru");
            return resolve(503);
        }
        
        pool.query(
            'SELECT `days` FROM `daily` WHERE steamID=?',
            [ steamId ],
            ( error: QueryError, result: RowDataPacket[] ) => {
                if(error) {
                    logger(`Błąd zapytania (pobieranie daily | klient: ${steamId}, (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                    res.status(404).send(404);
                    return resolve(404);
                } 

                if(result[0]){
                    logger(`Pomyślnie zwrócono daily (klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(result[0])}`);
                    res.status(200).send(result[0]);
                    return resolve(200);
                }

                res.status(404).end();
                return resolve(404);
            }
        );
    })
}