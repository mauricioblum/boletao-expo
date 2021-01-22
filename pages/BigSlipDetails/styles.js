import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: linear-gradient(#ffffff, rgb(234, 239, 245));
`;

export const Content = styled.View`
  padding-left: 33px;
  padding-right: 11px;
  padding-bottom: 16px;
  margin-bottom: 9px;
  margin-top: 13px;
`;

export const Subtitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const BigSlipList = styled.ScrollView`
  margin-bottom: 30px;
`;

export const SlipItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: #7a7a7a;
  padding-top: 9px;
  padding-bottom: 9px;
`;

export const SlipInfo = styled.View``;
export const SlipExtraInfo = styled.View`
  margin-bottom: 15px;
`;

export const SlipTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 15px;
  line-height: 20px;
  color: #000000;
`;

export const SlipDescription = styled(SlipTitle)`
  font-family: 'Montserrat-Regular';
  color: #7a7a7a;
`;

export const ButtonContainer = styled.View`
  padding: 0 22px;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 100%;
  padding: 9px 15px;
  border-radius: 8px;
  border: 2px solid #5056f6;
  background-color: transparent;
  margin-bottom: 31px;
`;

export const DeleteButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #5056f6;
  letter-spacing: 0.5;
  text-align: center;
`;

export const SlipButton = styled.TouchableOpacity`
  width: 100%;
  padding: 9px 15px;
  border-radius: 8px;
  background-color: #5056f6;
  margin-bottom: 31px;
`;

export const SlipButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #fff;
  letter-spacing: 0.5;
  text-align: center;
`;
