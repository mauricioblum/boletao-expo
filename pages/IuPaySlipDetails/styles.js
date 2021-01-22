import styled from 'styled-components/native';

export const ButtonView = styled.View`
  padding: 0 24px;
  margin-top: 28px;
`;

export const SlipButton = styled.TouchableOpacity`
  width: 100%;
  padding: 9px 15px;
  border-radius: 8px;
  border: ${props =>
    props.bgColor ? `solid 2px ${props.bgColor}` : 'solid 2px #fff'};
  background-color: ${props => props.bgColor || '#fff'};
`;

export const SlipButtonText = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #fff;
  letter-spacing: 0.5;
  text-align: center;
`;

export const Options = styled.View`
  display: flex;
  flex-direction: column;
`;

export const Option = styled.TouchableOpacity`
  padding: 8px 10px;
  width: 100%;
  border-bottom-width: ${props => (!props.noBorder ? '1px' : '0')};
  border-bottom-color: #000;
`;
export const OptionText = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  color: #000000;
`;

export const ModalHeader = styled.View`
  width: 100%;
  background-color: #f7f5f4;
  height: 41px;
  padding: 11px 11px 11px 31px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const ModalHeaderTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 14px;
  color: #727272;
`;

export const ModalContent = styled.View`
  padding: 19px 32px 30px;
`;

export const ModalClose = styled.TouchableOpacity`
  margin-left: auto;
`;

export const ModalTitle = styled.Text`
  font-family: 'Montserrat-SemiBold';
  font-size: 15px;
  color: ${props => props.color || '#650199'};
  margin-bottom: 44px;
`;

export const ModalText = styled.Text`
  font-family: 'Montserrat-Regular';
  color: #000;
  line-height: 22px;
`;

export const ModalTextBold = styled(ModalText)`
  font-family: 'Montserrat-Bold';
`;
