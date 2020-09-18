import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      /* pega o token que está salvo no app */
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // validar token
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  });

  return (
    <Container>
      <LoadingIcon size="large" color="#FFF" />
    </Container>
  );
};
