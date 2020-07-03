import React, { useCallback, useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Container, Main } from './styles';
import { useParams } from 'react-router-dom';
import api from '../../services/api';


interface signUpData {
    name: string;
    email: string;
    password: string;
}

const Edit: React.FC = () => {

    const [data, setData] = useState<signUpData>({} as signUpData);
    const { updateUser } = useAuth();
    const { id } = useParams();
    // const history = useHistory();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setData({ ...data, [name]: value });
    }

    useEffect(() => {

        const token = localStorage.token;
        localStorage.setItem('token', token);
        api.defaults.headers.authorization  = `Bearer ${token}`;

        api.get(`user/${id}`).then(response => {

            setData(response.data);

        });

    }, [id]);

    const handleLogin = useCallback(
        async () => {

        await updateUser({
            name: data.name,
            email: data.email,
            password: data.password,
        });


    }, [data, updateUser]);

  return (
        <Container>
            <Main>

               <form action="" onSubmit={handleLogin}>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="Digite seu nome" 
                    onChange={handleInputChange}
                    value={data.name}
                    />
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Digite seu e-mail" 
                    onChange={handleInputChange}
                    value={data.email}
                    />
                    {/* <input 
                    type="password" 
                    name="oldPassword" 
                    id="oldPassword" 
                    placeholder="Digite sua senha atual" 
                    onChange={handleInputChange}
                    /> */}
                      <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Digite sua nova senha" 
                    onChange={handleInputChange}
                    />
               </form>

                <button onClick={handleLogin}>Salvar informacoes</button>
            </Main> 

        </Container>
  );
}

export default Edit;