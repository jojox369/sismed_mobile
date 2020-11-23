import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {
  ScreenColor,
  HeaderTitleColor,
  SearchBoxColor,
} from '../../../assets/styles';
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${HeaderTitleColor};
`;

export const SearchArea = styled.View`
  background-color: ${SearchBoxColor};
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ChooseField = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  margin-left: 10px;
`;

/* export const SearchEmployeeArea = styled.View`
  background-color: ${SearchBoxColor};
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`; */

export const EmployeeInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const SearchEmployeeArea = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    backgroundColor: SearchBoxColor,
    color: 'black',
    marginTop: 30,
    flex: 1,
  },
});
