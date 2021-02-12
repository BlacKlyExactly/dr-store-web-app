import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, RowDataPacket } from "mysql2"
import pool from "../../../../utils/mysql";
import logger from "../../../../utils/logger";
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

            res.status(503).send("Podano tablicę do parametru");
            return resolve(503);
        }

        const queryData: Array<string> = data.split("&");
        const [ steamId, item ] = queryData;

        if(!steamId || !item){
            logger(`Podano tablicę do parametru (${scriptName})`);

            res.status(503).send("Podano tablicę do parametru");
            return resolve(503);
        }

        pool.query(
            'SELECT `equipment` FROM `users` WHERE steamID=?',
            [ steamId ],
            ( error: QueryError, result: RowDataPacket[] ) => {
                if(error) {
                    console.log(error);
                    res.status(503).send(error);
                    return resolve(503);
                } 

                if(result[0]){
                    const items: string[] = result[0].equipment.split(";");
                    items.push(item);
                    pool.query('UPDATE `users` SET equipment=? WHERE steamID=?', [ items.join(";"), steamId ]);

                    res.status(200).end();
                    return resolve(200);
                }

                res.status(404).end();
                return resolve(404);
            }
        );
    })
}