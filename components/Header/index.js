import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  TitleContainer,
  Title,
  SubtitleContainer,
  Subtitle,
} from './styles';

export default function Header({ title, subtitle, type = 'Scan' }) {
  const { navigate, goBack } = useNavigation();

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {type === 'Scan' ? (
          <TouchableOpacity onPress={() => navigate('BarcodeScanner')}>
            <Icon name="barcode-scan" size={28} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => goBack()}>
            <Icon name="arrow-left" size={28} color="#000" />
          </TouchableOpacity>
        )}
      </TitleContainer>
      {!!subtitle && (
        <SubtitleContainer>
          <Subtitle>{subtitle}</Subtitle>
        </SubtitleContainer>
      )}
    </Container>
  );
}

Header.defaultProps = {
  subtitle: '',
  type: 'Scan',
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  type: PropTypes.string,
};
