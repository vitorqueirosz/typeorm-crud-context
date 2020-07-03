import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

interface signInData {
    email: string;
    password: string;
}

interface signUpData {
    name: string;
    email: string;
    password: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

interface UserUpdate {
    name: string;
    email: string;
    password: string;
}

interface AuthData {
    signIn(data: signInData): Promise<void>;
    signUp(data: signUpData): Promise<void>;
    signOut(): void;
    handleDeleteUser(): void;
    updateUser(data: UserUpdate): Promise<void>;
    user: User;

}
interface AuthState {
    token: string;
    user: User;
}

const Context = createContext<AuthData>({} as AuthData);

const AuthProvider: React.FC = ({ children }) => {  

    const history = useHistory();
    
    const [data, setData] = useState<AuthState>(() => {

        const token = localStorage.getItem('token');

        const user = localStorage.getItem('user');

        if (token && user) {
            api.defaults.headers.authorization  = `Bearer ${token}`;

            return { token, user: JSON.parse(user)};
        }

        return {} as AuthState;
    });
    
   const signIn = useCallback(async ({ email, password }) => {

        const response = await api.post('/sessions', { email, password });

        const { token, user } = response.data;

        localStorage.setItem('token', token);
        api.defaults.headers.authorization  = `Bearer ${token}`;

        console.log(token)
        history.push(`/dashboard/${user.id}`);

        setData({ token, user });

    }, [history]);

    const signUp = useCallback(

        async ({name, email, password }) => {
        await api.post('/logon', { name, email, password }).then(response => {

      
        api.post('/sessions', { email, password}).then(response => {
                
                const { token, user } = response.data;
        
                setData({ token, user });

                history.push(`/dashboard/${user.id}`);
            })

        });


    }, [history]);

    const signOut = useCallback(
        () => {
        
            localStorage.removeItem('token');
            api.defaults.headers.authorization  = undefined;
            history.push('/');

    }, [history]);

    const handleDeleteUser = useCallback(
       async () => {

        const token = localStorage.token;
        localStorage.setItem('token', token);
        api.defaults.headers.authorization  = `Bearer ${token}`;   

        await api.delete('/user');
        history.push('/');

    }, [history]);

    const updateUser = useCallback(
        async ({ name, email, password}) => {

        const token = localStorage.token;
        localStorage.setItem('token', token);
        api.defaults.headers.authorization  = `Bearer ${token}`;
        
        api.put('/user', {name, email, password}).then(response => {

            const user = response.data;

            setData(user);
        })
    }, []);

    

  return (
    <Context.Provider value={{ signIn, signUp, signOut, user: data.user, updateUser, handleDeleteUser }}>
      {children}
    </Context.Provider>
  )
}

function useAuth(): AuthData {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
export {useAuth, AuthProvider};