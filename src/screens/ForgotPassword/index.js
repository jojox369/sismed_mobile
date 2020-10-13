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
import {SignInput} from '../../components/SignInput';
import LoadingComponent from '../../components/Loading';
import SismedIcon from '../../assets/icons/sismed.svg';
import UserIcon from '../../assets/icons/user.svg';
import LockIcon from '../../assets/icons/lock.svg';
import VerificationIcon from '../../assets/icons/verification.svg';
import {showMessage} from 'react-native-flash-message';

import {CPF, unmaskCPF} from '../../pipes/pipes';
import Api from '../../services/forgotPassword';

export default () => {
  const navigation = useNavigation();

  const [cpfField, setCPFField] = useState('');
  const [loading, setLoading] = useState(false);
  const [userValited, setUserValited] = useState(false);
  const [verifyCode, setVerifyCode] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();

  const handleRecoverPassword = async () => {
    setLoading(true);
    
    let response = await Api.forgotPassword(unmaskCPF(cpfField));
    
    if(response == 'unauthorized'){
      showMessage({
        message: 'Usuário não possui acesso',
        type: 'warning',
        icon: 'warning',
      });
      setLoading(false);
    } else if (response == 'error'){
      showMessage({
        message: 'Erro ao tentar verificar usuário',
        type: 'danger',
        icon: 'danger',
      });
      setLoading(false);
    } else {
      setLoading(false);
      setUserValited(true);
      setUserName(response.username);
      setUserId(response.id);
    }
  };

  const handleChangePassword = async() => {
    setLoading(true);
    let response = await Api.getVerificationCode(userName);
    console.log(response.code);
    if(response != 'error'){
      if (response.code === verifyCode){
        let updatePasswordResponse = await Api.uptadePassword(userId,userName,password);
        
        if(updatePasswordResponse != 'error'){
          showMessage({
            message: 'Senha atualizada com sucesso',
            type: 'success',
            icon: 'success',
          });
          setTimeout(()=>{
            navigation.reset({
              routes: [{name: 'SignIn'}],
            });
          }, 4000);
          
        } else {
          showMessage({
            message: 'Erro ao tentar atualizar senha',
            type: 'danger',
            icon: 'danger',
          });
        }

      } else {
        showMessage({
          message: 'Erro ao tentar verificar usuário',
          type: 'danger',
          icon: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Erro ao tentar verificar codigo',
        type: 'danger',
        icon: 'danger',
      });
    }
  }

  const handleLoginButton = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <Container>
      {!loading  && <SismedIcon width="100%" height="160" />}

      {!loading && !userValited && <InputArea>
        <SignInput
          IconSvg={UserIcon}
          placeholder="Digite seu CPF"
          value={cpfField}
          onChangeText={(t) => setCPFField(CPF(t))}
          keyboardType='numeric'
        />

        <CustomButtom onPress={handleRecoverPassword}>
          <CustomButtomText>RECUPERAR SENHA</CustomButtomText>
        </CustomButtom>
      </InputArea>}

       

      {loading && <LoadingComponent />}

      {userValited && !loading && (
        <InputArea>
          <SignInput
            IconSvg={LockIcon}
            placeholder="Digite a nova senha"
            value={password}
            onChangeText={(t) => setPassword(t)}
            password={true}
          /> 
          <SignInput
          IconSvg={VerificationIcon}
          placeholder="Digite o codigo de verificação"
          value={verifyCode}
          onChangeText={(t) => setVerifyCode(t)} 
        />
        <CustomButtom onPress={handleChangePassword}>
            <CustomButtomText>ATUALIZAR SENHA</CustomButtomText>
        </CustomButtom>
        </InputArea>
      )}

      {!loading && <ForgotPasswordButton onPress={handleLoginButton}>
        <ForgotPasswordButtonText>Realizar Login</ForgotPasswordButtonText>
      </ForgotPasswordButton>}
    </Container>
  );
};
