import React, { createContext, useReducer, useEffect } from 'react';
import { UserReducer } from '../reducers/UserReducer';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext();

export default ({ children }) => {
  const initialState = {
    id: '',
    cpf: '',
    id: 0,
    perfil: 0,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const verifyHasData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData);
      if (user) {
        dispatch({ type: 'setUser', payload: { user: user } });
      } else {
        dispatch({ type: 'setUser', payload: { user: initialState } });
      }
    };
    verifyHasData();
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
