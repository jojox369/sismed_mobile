import React, {createContext, useReducer, useEffect, useState} from 'react';
import {UserReducer} from '../reducers/UserReducer';
import AsyncStorage from '@react-native-community/async-storage';

export const UserContext = createContext();

export default ({children}) => {
  const initialState = {};
  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    const verifyHasData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      const user = JSON.parse(userData);

      dispatch({type: 'setUser', payload: {user: user}});
    };
    verifyHasData();
  });

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
};
