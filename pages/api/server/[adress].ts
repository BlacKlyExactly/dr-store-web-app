import { NextApiRequest, NextApiResponse } from 'next';
import logger from "../../../utils/logger";
import NextCors from 'nextjs-cors';
import * as Gamedig from "gamedig";

const scriptName: string = __filename.slice(__dirname.length + 1);

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    });

    return new Promise(async ( resolve ) => {
        const {
            query: { adress },
        } = req;

        if(adress instanceof Array){
            logger(`Podano tablicę do parametru (${scriptName})`);

            res.status(503).send(503);
            return resolve(503);
        }

        const adressData: string[] = adress.split(":");
        const [ ip, port ] = adressData;

        try {
            const state = await Gamedig.query({
                type: "csgo",
                host: ip,
                port: parseInt(port)
            });

            res.status(200).send(state);
            return resolve(200);
        } catch (error) {
            console.log(error);

            res.status(503).send(503);
            return resolve(503);
        }
    })
}