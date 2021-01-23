import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { privateApi } from 'services/api';
// import { getAppVersion } from 'utils/codePushUtils';

import Icon from 'react-native-vector-icons/Octicons';
import {
  OuterContainer,
  Container,
  PageHeader,
  MenuWrapper,
  MenuItem,
  MenuItemText,
  VersionText,
} from './styles';

export default function Configs({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [codePushAppVersion, setCodePushAppVersion] = useState('Indisponível');

  // useEffect(() => {
  //   const appVersion = getAppVersion();

  //   if (appVersion) {
  //     setCodePushAppVersion(appVersion.label);
  //   }
  // }, []);

  async function handleLogout() {
    setLoading(true);
    try {
      await privateApi.delete('/profile/logout');
      await AsyncStorage.removeItem('@Boletao:userToken');
      setLoading(false);
      navigation.navigate('Login');
    } catch (err) {
      // console.tron.log(err);
      setLoading(false);
    }
  }

  function alertLogout() {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Sair', onPress: () => handleLogout() },
      ],
      { cancelable: false }
    );
  }
  return (
    <OuterContainer>
      <PageHeader>Configurações</PageHeader>
      <Container>
        <MenuWrapper>
          <MenuItem onPress={() => navigation.navigate('Profile')}>
            <MenuItemText>MEU PERFIL</MenuItemText>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate('ChangePassword')}>
            <MenuItemText>ALTERAR SENHA</MenuItemText>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate('Terms')}>
            <MenuItemText>TERMOS DE USO</MenuItemText>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate('Help')}>
            <MenuItemText>AJUDA</MenuItemText>
          </MenuItem>
          <MenuItem onPress={() => navigation.navigate('Faq')}>
            <MenuItemText>FAQ</MenuItemText>
          </MenuItem>
          <MenuItem onPress={() => alertLogout()}>
            <MenuItemText>SAIR</MenuItemText>
          </MenuItem>
        </MenuWrapper>
        <VersionText>Versão: {codePushAppVersion}</VersionText>
      </Container>
    </OuterContainer>
  );
}

Configs.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Configs.navigationOptions = {
  tabBarIcon: () => <Icon name="settings" size={22} color="#000" />,
  tabBarLabel: 'Configurações',
};
