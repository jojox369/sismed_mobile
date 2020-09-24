import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext';

import {cpfMask, unmaskCPF} from '../../assets/functions';
import {SignInput} from '../../components/SignInput';
import LoadingComponent from '../../components/Loading';
import Api from '../../services/login';

import SismedIcon from '../../assets/icons/sismed.svg';
import UserIcon from '../../assets/icons/user.svg';
import LockIcon from '../../assets/icons/lock.svg';
import ShowPasswordIcon from '../../assets/icons/showPassword.svg';

import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
} from './styles';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [cpfField, setCPFField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignClick = async () => {
    if (cpfField != '' && passwordField != '') {
      setLoading(true);
      let response = await Api.signIn(unmaskCPF(cpfField), passwordField);

      if (response.token) {
        user = await Api.getUserDetails(unmaskCPF(cpfField), response.token);
        if (user) {
          await AsyncStorage.setItem('token', 'Token ' + response.token);
          await AsyncStorage.setItem('userData', JSON.stringify(user));

          userDispatch({
            type: 'setUser',
            payload: {
              user: user,
            },
          });

          navigation.reset({
            routes: [{name: 'MainTab'}],
          });
        }
      } else {
        console.log('login e senha errados');
      }
    } else {
      alert('Preencha os campos!');
    }
  };

  const handleMessaButtonClick = () => {
    navigation.reset({
      routes: [{name: 'ForgotPassword'}],
    });
  };

  if (loading) {
    return <LoadingComponent />;
  } else {
    return (
      <Container>
        <SismedIcon width="100%" height="160" />

        <InputArea>
          <SignInput
            IconSvg={UserIcon}
            placeholder="Digite seu CPF"
            value={cpfField}
            onChangeText={(t) => setCPFField(cpfMask(t))}
            keyboardType="numeric"
          />
          <SignInput
            IconSvg={LockIcon}
            placeholder="Digite sua Senha"
            value={passwordField}
            onChangeText={(t) => setPasswordField(t)}
            password={true}
          />

          <CustomButtom onPress={handleSignClick}>
            <CustomButtomText>LOGIN</CustomButtomText>
          </CustomButtom>
        </InputArea>

        <ForgotPasswordButton onPress={handleMessaButtonClick}>
          <ForgotPasswordButtonText>
            Esqueci minha senha
          </ForgotPasswordButtonText>
        </ForgotPasswordButton>
      </Container>
    );
  }
};
