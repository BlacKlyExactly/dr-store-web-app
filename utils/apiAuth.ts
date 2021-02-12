import { NextApiRequest } from "next";

const apiAuth = ( req: NextApiRequest ): boolean => {
    if(!req.headers.authorization) return false;

    const [ type, token ] = req.headers.authorization.split(" ");
    const { NEXT_PUBLIC_API_AUTH_TOKEN, NEXT_PUBLIC_API_AUTH_TYPE } = process.env;

    if(type !== NEXT_PUBLIC_API_AUTH_TYPE || token !== NEXT_PUBLIC_API_AUTH_TOKEN)
        return false;
    return true;
}

export default apiAuth;