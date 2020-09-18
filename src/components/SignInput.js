import React from 'react';
import styled from 'styled-components/native';

/* Area do campo */
const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #FFF;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;
const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;


export default ({ IconSvg, placeholder, keyboardType }) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#000" />
      <Input
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </InputArea>
  );
}