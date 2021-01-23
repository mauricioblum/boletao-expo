import styled from 'styled-components/native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 1000px;
`;

export const Placeholder = styled.View`
  width: 100%;
`;

export const Shimmering = styled(ShimmerPlaceHolder).attrs({
  autoRun: true,
})`
  margin-bottom: 25px;
`;
