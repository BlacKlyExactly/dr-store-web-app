import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, RowDataPacket } from "mysql2"
import pool from "../../../utils/mysql";
import logger from "../../../utils/logger";
import apiAuth from "../../../utils/apiAuth";
import os from "os";

const scriptName: string = __filename.slice(__dirname.length + 1);

export type DatabaseUser = {
    name: string,
    steamID: string,
    equipment: string,
    coins: number
}

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(resolve => {
        const {
            query: { steamId },
        } = req;

        if(!apiAuth(req)){
            res.status(403).send("Błędny klucz API");
            return resolve(403);
        }

        if(!steamId){
            res.status(403).send("Niepodano steamID");
            return resolve(403);
        }


        pool.query('CREATE TABLE IF NOT EXISTS users (name VARCHAR(64) NOT NULL, steamID VARCHAR(64) NOT NULL UNIQUE, equipment VARCHAR(1024) NULL, coins INT NULL);');
        pool.query('CREATE TABLE IF NOT EXISTS daily (steamID VARCHAR(64) NOT NULL UNIQUE, days VARCHAR(1024) NULL)');

        pool.query(
            'SELECT * FROM `users` WHERE steamID=?',
            [ steamId ],
            ( error: QueryError, result: RowDataPacket[] ) => {
                if(error) {
                    logger(`Błąd zapytania (zwracanie użytkownika | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);
                    console.log(error);
                    res.status(503).send(error);
                    return resolve(503);
                } 

                if(result[0]){
                    logger(`Pomyślnie zwrócono użytkownika (klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(result[0])}`);
                    res.status(200).send(result[0]);
                    return resolve(200);
                }

                res.status(404).end();
                return resolve(404);
            }
        );
    })
}