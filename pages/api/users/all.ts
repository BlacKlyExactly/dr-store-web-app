import { NextApiRequest, NextApiResponse } from 'next';
import pool from "../../../utils/mysql";
import logger from "../../../utils/logger";
import apiAuth from "../../../utils/apiAuth";
import os from "os";
import { QueryError, RowDataPacket } from 'mysql2';

const scriptName: string = __filename.slice(__dirname.length + 1);

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(resolve => {
        if(!apiAuth(req)){
            res.status(403).send("Błędny klucz API");
            return resolve(403);
        }

        pool.query(
            'SELECT * FROM `users` ORDER BY convert(`coins`, decimal) DESC', 
            ( err: QueryError, result: RowDataPacket[] ) => {
                if(err){
                    logger(`Błąd zapytania do bazy MySql (zwracanie wszystkich użytkowników) (${scriptName}): ${os.EOL} ${JSON.stringify(err)}`);
                    res.status(503).send(err);
                    return resolve(503);
                }

                if(result[0]){
                    res.status(200).send(result);
                    return resolve(200);
                }
                
                res.status(404).send([]);
                return resolve(404);
            }
        )
    })
}