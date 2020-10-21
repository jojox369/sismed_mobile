import React, {useState, useContext} from 'react';
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
import {showMessage} from 'react-native-flash-message';
import LoadingComponent from '../../components/Loading';
import {ButtonIconColor} from '../../assets/styles';

export default () => {
  const navigation = useNavigation();
  const {state} = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    showMessage({
      message: 'Deslogado com sucesso',
      type: 'success',
      icon: 'success',
    });
    setTimeout(() => {
      navigation.navigate('PreLoad');
    }, 4000);
  };

  return (
    <Container>
      {!loading && (
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
            <LogoutIcon width="25" height="25" fill={ButtonIconColor} />
            <ButtonText>Sair</ButtonText>
          </LogoutButton>
        </ListInfo>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
