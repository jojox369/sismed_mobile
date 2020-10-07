import React, {useEffect} from 'react';
import {Container} from './styles';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('PreLoad');
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container>
      <Text>Profile Page</Text>
    </Container>
  );
};
