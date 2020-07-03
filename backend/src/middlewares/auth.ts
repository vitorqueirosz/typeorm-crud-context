import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Data {
    id: string;
    iat: string;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided'});
    };

    const token = authorization.replace('Bearer', '').trim();

    try {
     
        const data = jwt.verify(token, 'fbf50ab4a5fc4c118a669d22fa726240sa5s5s5faf');

        const { id } = data as Data;    

        req.userId = id;

        return next();

    } catch{
        return res.status(401).json({ error: 'Token invalid'});
    }

}