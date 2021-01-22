import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubTitle,
  HeaderIcon,
} from './styles';

export default function StepHeader({ title, subtitle }) {
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderIcon onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#000" />
        </HeaderIcon>
      </Header>
      <HeaderSubTitle>{subtitle}</HeaderSubTitle>
    </Container>
  );
}

StepHeader.defaultProps = {
  subtitle: '',
};

StepHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
