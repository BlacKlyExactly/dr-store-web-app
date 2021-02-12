import { NextApiRequest, NextApiResponse } from 'next';
import apiAuth from '../../../../utils/apiAuth';
import SteamID from "steamid";
import axios, { AxiosResponse } from "axios";
 
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
            res.status(503).send("Podano tablicę do parametru");
            return resolve(503);
        }

        try {
            const sid = new SteamID(steamId);
            const url: string = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002";

            const response: AxiosResponse = await axios.get(
                `${url}/?key=${process.env.WEB_API_KEY}&steamids=${sid.getSteamID64()}`,
                { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }}
            )
            res.status(200).send(response.data.response.players[0].avatar);
            return resolve(200);
        } catch (error) {
            console.log(error);
            
            res.status(503).end(error);
            return resolve(503);
        }
    })
}