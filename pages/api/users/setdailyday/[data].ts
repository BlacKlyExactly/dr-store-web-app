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

        const [ steamId, day, value ] = data.split("&")
        
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
                    let days: string[] = result[0].days.split(";");
                    days[day] = value;

                    pool.query(
                        "UPDATE `daily` SET `days`=? WHERE steamID=?",
                        [ days.join(";"), steamId ]
                    );
                    
                    res.status(200).end();
                    return resolve(200);
                }

                res.status(404).end();
                return resolve(404);
            }
        );
    })
}