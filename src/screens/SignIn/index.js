import React from 'react';
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtomText,
  ForgotPasswordButton,
  ForgotPasswordButtonText
} from './styles';
import SignInput from '../../components/SignInput'
import SismedIcon from '../../assets/sismed.svg';
import UserIcon from '../../assets/user.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  return (
    <Container>

      <SismedIcon width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={UserIcon}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua Senha"

        />

        <CustomButtom>
          <CustomButtomText>
            LOGIN
          </CustomButtomText>
        </CustomButtom>
      </InputArea>

      <ForgotPasswordButton>
        <ForgotPasswordButtonText>Esqueci minha senha</ForgotPasswordButtonText>
      </ForgotPasswordButton>
    </Container>
  );
};
