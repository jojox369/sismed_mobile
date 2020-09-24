import React, {useEffect} from 'react';
import LoadingComponent from '../../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      /* pega o token que está salvo no app */
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  });

  return <LoadingComponent />;
};
