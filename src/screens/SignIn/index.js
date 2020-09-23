import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {useNavigation} from '@react-navigation/native';
import Api from '../../services/Api';
import AsyncStorage from '@react-native-community/async-storage';
import {cpfMask, unmaskCPF} from '../../components/Mask';
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
} from './styles';
import {SignInput} from '../../components/SignInput';
import SismedIcon from '../../assets/sismed.svg';
import UserIcon from '../../assets/user.svg';
import LockIcon from '../../assets/lock.svg';
import ShowPasswordIcon from '../../assets/showPassword.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [cpfField, setCPFField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () => {
    if (cpfField != '' && passwordField != '') {
      let response = await Api.signIn(unmaskCPF(cpfField), passwordField);

      if (response.token) {
        user = await Api.getUserDetails(unmaskCPF(cpfField), response.token);
        if (user) {
          await AsyncStorage.setItem('token', 'Token ' + response.token);

          userDispatch({
            type: 'setId',
            payload: {
              id: user.id,
            },
          });

          userDispatch({
            type: 'setNome',
            payload: {
              nome: user.nome,
            },
          });

          userDispatch({
            type: 'setCPF',
            payload: {
              cpf: user.cpf,
            },
          });

          userDispatch({
            type: 'setPerfil',
            payload: {
              perfil: user.perfil,
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

          // colocar icone para revelar a senha
        />

        <CustomButtom onPress={handleSignClick}>
          <CustomButtomText>LOGIN</CustomButtomText>
        </CustomButtom>
      </InputArea>

      <ForgotPasswordButton onPress={handleMessaButtonClick}>
        <ForgotPasswordButtonText>Esqueci minha senha</ForgotPasswordButtonText>
      </ForgotPasswordButton>
    </Container>
  );
};
