import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  ForgotPasswordButton,
  ForgotPasswordButtonText
} from './styles';
import { CPFInput, PasswordInput } from '../../components/SignInput'
import SismedIcon from '../../assets/sismed.svg';
import UserIcon from '../../assets/user.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

  const navigation = useNavigation();
  const cpfUnmasked = '';
  const [cpfField, setCPFField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () => {
    if (cpfField != '' && passwordField != '') {
      let response = await Api.signIn(cpfField, passwordField);
      console.log(response.token)
    } else {
      alert('Preencha os campos!');
    }
  }

  const handleMessaButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'ForgotPassword' }]
    })
  }

  return (

    <Container>

      <SismedIcon width="100%" height="160" />

      <InputArea>
        <CPFInput
          IconSvg={UserIcon}
          placeholder="Digite seu CPF"
          value={cpfField}
          onChangeText={(formatted, extracted) => {
            setCPFField(extracted)

          }}
          refInput={ref => { setCPFField(ref) }}
        />
        <PasswordInput
          IconSvg={LockIcon}
          placeholder="Digite sua Senha"
          value={passwordField}
          onChangeText={t => setPasswordField(t)}
          password={true}
        //Colocar icone para relevar a senha
        />

        <CustomButtom onPress={handleSignClick}>
          <CustomButtomText>
            LOGIN
          </CustomButtomText>
        </CustomButtom>
      </InputArea>

      <ForgotPasswordButton onPress={handleMessaButtonClick}>
        <ForgotPasswordButtonText>Esqueci minha senha</ForgotPasswordButtonText>
      </ForgotPasswordButton>
    </Container>
  );
};
