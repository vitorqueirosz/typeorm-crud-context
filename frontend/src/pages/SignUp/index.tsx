import React, { useCallback, useState, ChangeEvent } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Container, Main } from './styles';

interface signUpData {
    name: string;
    email: string;
    password: string;
}

const Logon: React.FC = () => {

    const [data, setData] = useState<signUpData>({} as signUpData);
    const { signUp } = useAuth();
    // const history = useHistory();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setData({ ...data, [name]: value });
    }

    const handleLogin = useCallback(
        async () => {

            await signUp({
                name: data.name,
                email: data.email,
                password: data.password,
            });


    }, [data, signUp]);

  return (
        <Container>
            <Main>

               <form action="" onSubmit={handleLogin}>
                <input type="text" name="name" id="name" placeholder="Digite seu nome" onChange={handleInputChange}/>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" onChange={handleInputChange}/>
                    <input type="password" name="password" id="password" placeholder="Digite sua senha" onChange={handleInputChange}/>
               </form>

                <button onClick={handleLogin}>Cadastre-se</button>
            </Main> 

        </Container>
  );
}

export default Logon;