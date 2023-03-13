import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Services/Api';

export const UserContext = createContext<IUserContextValue>(
  {} as IUserContextValue
);

interface IProviderChildren {
  children: ReactNode;
}

export interface IUserRegister {
  name: string;
  email: string;
  password: number | string;
  confirmpassword: number | string;
}
export interface IUserLogin {
  email: string;
  password: number | string;
}

interface IUserContextValue {
  UserLogin: (data: IUserLogin) => Promise<void>;
  user: IUser | null;
  Logoult: () => void;
  UserRegister: (data: IUserRegister) => Promise<void>;
}

interface IUser {
  email: string;
  name: string;
  id: number;
}

export const Provider = ({ children }: IProviderChildren) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);

  const UserRegister = async (data: IUserRegister) => {
    try {
      await api.post('/users', data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const UserLogin = async (data: IUserLogin) => {
    try {
      const response = await api.post('/login', data);
      window.localStorage.clear();
      window.localStorage.setItem('authToken', response.data.accessToken);
      setUser(response.data);
      navigate('/shop');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const userAutoLogin = async () => {
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        navigate('/shop');
      } catch (error) {
        console.log(error);
        navigate('/');
      }
    };
    userAutoLogin();
  }, []);

  const Logoult = () => {
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, UserLogin, Logoult, UserRegister }}>
      {children}
    </UserContext.Provider>
  );
};
