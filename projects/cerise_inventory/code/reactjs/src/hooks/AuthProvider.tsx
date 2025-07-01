import { createContext, useContext, useState, useEffect } from 'react';

import axios from 'axios';

import { api } from '../services/api';

type userProps = {
  email?: string;
  password?: string;
};

type updateUserProps = {
  userProfile: {
    name?: string | undefined;
    email?: string | undefined;
    oldPassword?: string | undefined;
    newPassword?: string | undefined;
    birthday?: string | undefined;
    phone?: string | undefined;
  };
  avatarFile?: File | null;
};

type AuthContextType = {
  signIn: (credentials: userProps) => void;
  signOut: () => void;
  user: any;
  updateProfile: ({ userProfile, avatarFile }: updateUserProps) => void;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: {},
  updateProfile: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState({});

  const signIn = async ({ email, password }: userProps) => {
    try {
      const response = await api.post('/user/login', { email, password });
      const {
        categories,
        corporations,
        currentUser,
        inventories,
        permissions,
        sources,
        tokenData,
      } = response.data;

      const user = { ...currentUser, ...permissions[0] };

      localStorage.setItem(
        '@cerise-backend:categories',
        JSON.stringify(categories)
      );
      localStorage.setItem(
        '@cerise-backend:corporations',
        JSON.stringify(corporations)
      );
      localStorage.setItem(
        '@cerise-backend:inventories',
        JSON.stringify(inventories)
      );
      localStorage.setItem(
        '@cerise-backend:sources',
        JSON.stringify(sources)
      );
      localStorage.setItem('@cerise-backend:token', tokenData.token);
      localStorage.setItem('@cerise-backend:user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = tokenData.token;
      setData({ ...user, token: tokenData.token });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          alert(error.response?.data.message);
        } else {
          alert('Não foi possível entrar.');
        }
      } else {
        alert('Não foi possível entrar.');
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem('@cerise-backend:categories');
    localStorage.removeItem('@cerise-backend:corporations');
    localStorage.removeItem('@cerise-backend:editingInventory');
    localStorage.removeItem('@cerise-backend:editingInventoryItem');
    localStorage.removeItem('@cerise-backend:inventories');
    localStorage.removeItem('@cerise-backend:inventory');
    localStorage.removeItem('@cerise-backend:inventoryItem');
    localStorage.removeItem('@cerise-backend:inventoryItems');
    localStorage.removeItem('@cerise-backend:permissions');
    localStorage.removeItem('@cerise-backend:token');
    localStorage.removeItem('@cerise-backend:user');

    setData('');
  };

  const updateProfile = async ({
    userProfile,
    avatarFile,
  }: updateUserProps) => {
    try {
      const token = localStorage.getItem('@cerise-backend:token');
      const user = localStorage.getItem('@cerise-backend:user');
      if (user) {
        let userInfo = JSON.parse(user);

        if (avatarFile) {
          const fileUploadForm = new FormData();
          fileUploadForm.append('avatar', avatarFile);

          const response = await api.patch(
            `/user/avatar/${userInfo.id}`,
            fileUploadForm
          );
          userInfo.avatar = response.data.avatar;
        }

        await api.put(`/user/${userInfo.id}`, userProfile);

        userInfo.name = userProfile.name ? userProfile.name : userInfo.name;
        userInfo.email = userProfile.email ? userProfile.email : userInfo.email;

        localStorage.setItem(
          '@cerise-backend:user',
          JSON.stringify(userInfo)
        );
        setData({ ...userInfo, token });
      }
    } catch (error) {
 if (axios.isAxiosError(error)) {
        if (error.response?.data.message) {
          alert(error.response?.data.message);
        } else {
          alert('Não foi possível atualizar perfil.');
        }
      } else {
        alert('Não foi possível atualizar perfil.');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('@cerise-backend:token');
    const user = localStorage.getItem('@cerise-backend:user');
    if (user) {
      const userInfo = JSON.parse(user);

      if (token && user) {
        api.defaults.headers.common['Authorization'] = token;

        setData({ ...userInfo, token });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };