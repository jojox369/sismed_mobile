import styled from 'styled-components/native';
import {
  ScreenColor,
  ButtonColor,
  ButtonTextColor,
  HeaderTitleColor,
} from '../../assets/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const ListInfo = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${HeaderTitleColor};
`;

export const UserText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  width: 350px;
  height: 30px;
  border-radius: 20px;
  padding-left: 10px;
  padding-top: 2px;
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-top: 30px;
  border: 2px solid ${ButtonColor};
  width: 100px;
  height: 40px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${ButtonTextColor};
`;

export const UserTextArea = styled.View`
  margin-top: 30px;
`;

export const Label = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-left: 10px;
  color: ${HeaderTitleColor};
`;
