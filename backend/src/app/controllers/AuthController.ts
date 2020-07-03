import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthController {
    async authenticate(req: Request, res: Response) {
        

        const repository = getRepository(User);

        const { name, email, password } = req.body;

        const user = await repository.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found'});
        };

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Password does not match'});
        }

        const token = jwt.sign({ id: user.id }, 'fbf50ab4a5fc4c118a669d22fa726240sa5s5s5faf', { expiresIn: '5d'});

        return res.json({ user, token});
    }
};


export default new AuthController();