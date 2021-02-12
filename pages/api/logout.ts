import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from "cookie";

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    res.setHeader('Set-Cookie', [
      serialize('token', '', {
        maxAge: -1,
        path: '/',
      }),
    ]);
  
    res.writeHead(302, { Location: '/' });
    res.end();
  }