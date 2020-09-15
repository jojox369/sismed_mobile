import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { Container } from './styles';

function User() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Login page</Text>
      <Button
        title="Navegar para a pagina princiapal"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

export default User;
