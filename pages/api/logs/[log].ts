import { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";
import os from "os";

const loging: boolean = false;

export default ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(async ( resolve: any ) => {
        
        if(!loging){
            res.status(200).end();
            return resolve(200);
        }

        const {
            query: { log },
        } = req;
        
        const today = new Date();
        const date: string = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;
        const time: string = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

        const parsedLog: string = JSON.stringify(req.body).slice(2, -2).slice(0, -3);
        const fullLog: string = `--- [${time}] ---${os.EOL}${parsedLog}${os.EOL}--------------${os.EOL}`

        fs.appendFile(`shop-logs-${date}.txt`, fullLog, err => {
            res.status(200).end();
            return resolve(200);
        })
    })
}
