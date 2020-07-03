import React, { useContext, useState, ChangeEvent, useCallback } from 'react';

import { useAuth } from '../Context/AuthContext';
import { Container, Main } from './styles';
import { useHistory } from 'react-router-dom';

interface signInFormData {
    email: string;
    password: string;

}


const Home: React.FC = () => {

    const [data, setData] = useState<signInFormData>({} as signInFormData);
    const { signIn } = useAuth();


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        
        setData({ ...data, [name]: value});
    }

   const handleSubmit = useCallback(
       async () => {

        await signIn({
            email: data.email,
            password: data.password
        });

   }, [signIn, data]);

  return (
        <Container>
            <Main>

            <form action="" onSubmit={handleSubmit}>
                <input type="email" name="email" id="email" onChange={handleInputChange} placeholder="Digite seu e-mail"/>
                <input type="password" name="password" id="password" onChange={handleInputChange} placeholder="Digite sua senha"/>
            </form>

                <button onClick={handleSubmit}>Entrar</button>
            </Main> 

        </Container>
  );
}

export default Home;