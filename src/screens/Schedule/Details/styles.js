import styled from 'styled-components/native';
import {
  ScreenColor,
  ButtonColor,
  ButtonTextColor,
} from '../../../assets/styles';

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const HeaderArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const IconArea = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 140px;
  height: 140px;
  border-radius: 100px;
`;

export const ScheduleProceeding = styled.Text`
  margin-top: 20px;
  font-weight: bold;
`;

export const DetailsArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const FieldArea = styled.View`
  padding-top: 20px;
`;

export const ClinicalRecordButton = styled.TouchableOpacity`
  width: 100%;
  border: 1px solid ${ButtonColor};
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${ButtonTextColor};
`;

export const ButtonArea = styled.View`
  width: 100%;
  margin-bottom: 25px;
  margin-top: 25px;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
`;
