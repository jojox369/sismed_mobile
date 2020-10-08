import React, {useEffect, useContext} from 'react';
import {
  Container,
  ListInfo,
  UserText,
  LogoutButton,
  ButtonText,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../contexts/UserContext';
import LogoutIcon from '../../assets/icons/logout.svg';

export default () => {
  const navigation = useNavigation();
  const {state} = useContext(UserContext);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('PreLoad');
  };

  return (
    <Container>
      <ListInfo>
        <UserText>Usuário: {state.nome}</UserText>
        <UserText>
          Função:
          {state.perfil === 2
            ? ' Funcionário'
            : state.perfil === 3
            ? ' Administrador'
            : ' Médico'}
        </UserText>
        <LogoutButton onPress={logout}>
          <LogoutIcon width="25" height="25" fill="#000000" />
          <ButtonText>Sair</ButtonText>
        </LogoutButton>
      </ListInfo>
    </Container>
  );
};
