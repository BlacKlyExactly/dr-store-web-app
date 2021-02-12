import { NextApiRequest, NextApiResponse } from 'next';

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    const date = new Date();
    res.status(200).send(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}