import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(): void{
        this.password = bcrypt.hashSync(this.password, 8);
    };

    // @BeforeInsert()
    // @BeforeUpdate()
    // checkPassword(password: string) {
    //     return bcrypt.compare(password, this.password)
    // }
};


export default User;