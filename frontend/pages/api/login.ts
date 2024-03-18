import { NextApiRequest, NextApiResponse } from "next";

type UserLogin = {
    username: string,
    password: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            handlePost(req, res);
            break;
        default:
            res.status(404).json({});
    }
}


const handlePost = (req: NextApiRequest, res: NextApiResponse) => {
    let user = JSON.parse(req.body) as UserLogin;
    res.status(200).json({});
}