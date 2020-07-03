import React, { useState, useCallback, useContext, useEffect } from 'react';

import { useAuth } from '../Context/AuthContext';

import { Container, Infos } from './styles';
import api from '../../services/api';
import { useParams, useHistory } from 'react-router-dom';

interface Data {
  id: string;
  name: string;
  email: string;
  password: string;
}



const Profile: React.FC = () => {

    const [data, setData] = useState<Data>({} as Data);
    const { id } = useParams();
    const history = useHistory();
    const { signOut, handleDeleteUser } = useAuth();

  const handleEdit = useCallback(
    () => {

    history.push(`/edit/${id}`);

  }, [history, id]);

  const handleDelete = useCallback(
    () => {
      handleDeleteUser();
    }, [handleDeleteUser]);

  useEffect(
      
     () => {

        const token = localStorage.token;
        localStorage.setItem('token', token);
        api.defaults.headers.authorization  = `Bearer ${token}`;

     api.get(`/user/${id}`).then(response => {

          setData(response.data)
      }); 

      }, [id]);

    return (
        <Container>
          <h1>Hello, {data.name}</h1>
          <div>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Excluir</button>
          <button onClick={signOut}>Sair</button>
          </div>
          <Infos>
              <h1>Your infos</h1>

              <div>
                <span>Name: {data.name}</span>
                <span>E-mail: {data.email}</span>

              </div>
          </Infos>

        </Container>
    )
}

export default Profile;