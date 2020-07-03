import { Request, Response} from 'express';
import * as Yup from 'yup';
import { getRepository } from 'typeorm';
import User from '../models/User';


class UserController {
    async index(req: Request, res: Response) {

        const repository = getRepository(User);

        const { id } = req.params;

        const user = await repository.findOne({ where:  { id } });

        
        return res.json(user);
        
    };


    async store(req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations fails' });
        };


        const repository = getRepository(User);

        const { name, email, password } = req.body;

        const userExists = await repository.findOne({ where: { email }});
        
        if(userExists) {
            return res.status(401).json({ error: 'User already exists'});
        };

        const user = repository.create({ name, email, password });
        await repository.save(user);

        return res.json(user);
    };

    async update (req: Request, res: Response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
            .min(6).when('oldPassword', (oldPassword: string, field: any) =>
            oldPassword ? field.required() : field
        ),
            
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations fails' });
        }


        const repository = getRepository(User);

        const { email, oldPassword } = req.body;

        const user = await repository.findOne(req.userId);
        
        if (email !== user?.email) {
            const userExists = await repository.findOne({ where: { email }});

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        };

        if (oldPassword && !user?.password) {
            return res.status(400).json({ error: 'Password doest not match'});
        };

        console.log(user)
        if(user) {
            repository.merge(user, req.body);
            const results = await repository.save(user);

            return res.json(results)
        }

        return res.json({ error: 'error'});
    };

    async delete (req: Request, res: Response) {
        const repository = getRepository(User);

        await repository.delete(req.userId);

        return res.json({ message: 'User deleted'});
    };
};


export default new UserController();
