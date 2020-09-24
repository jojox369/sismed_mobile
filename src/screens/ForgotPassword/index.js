import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
} from './styles';
import {CPFInput, PasswordInput} from '../../components/SignInput';
import SismedIcon from '../../assets/icons/sismed.svg';
import UserIcon from '../../assets/icons/user.svg';
import LockIcon from '../../assets/icons/lock.svg';

export default () => {
  const navigation = useNavigation();

  const [cpfField, setCPFField] = useState('');

  const handleSignClick = () => {};

  const handleMessaButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      <SismedIcon width="100%" height="160" />

      <InputArea>
        <CPFInput
          IconSvg={UserIcon}
          placeholder="Digite seu CPF"
          value={cpfField}
          onChangeText={(t) => setCPFField(t)}
        />

        <CustomButtom onPress={handleSignClick}>
          <CustomButtomText>RECUPERAR SENHA</CustomButtomText>
        </CustomButtom>
      </InputArea>

      <ForgotPasswordButton onPress={handleMessaButtonClick}>
        <ForgotPasswordButtonText>Realizar Login</ForgotPasswordButtonText>
      </ForgotPasswordButton>
    </Container>
  );
};
