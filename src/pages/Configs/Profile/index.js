import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import StepHeader from '../../../components/StepHeader';
import {
  Container,
  Form,
  Label,
  InputName,
  InputEmail,
  InputPhone,
  Button,
  ButtonText,
  Error,
} from './styles';
import { UserTypes } from 'store/ducks/user';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({
    name: user.data.name,
    email: user.data.email,
    phone: user.data.mobile,
  });
  const dispatch = useDispatch();

  function handleChange(text, field) {
    setProfile({ ...profile, [field]: text });
  }

  function handleSaveProfile() {
    dispatch({
      type: UserTypes.UPDATE_USER_REQUEST,
      name: profile.name,
      email: profile.email,
      mobile: profile.phone,
    });
  }

  return (
    <Container>
      <StepHeader
        title="Meu Perfil"
        subtitle="Clique no campo para editar seu perfil"
      />
      <Form>
        <Label>NOME</Label>
        <InputName
          value={profile.name}
          onChangeText={(text) => handleChange(text, 'name')}
        />
        <Label>EMAIL</Label>
        <InputEmail
          value={profile.email}
          onChangeText={(text) => handleChange(text, 'email')}
        />
        <Label>CELULAR</Label>
        <InputPhone
          value={profile.phone}
          onChangeText={(text) => handleChange(text, 'phone')}
        />
        {!user.loading ? (
          <Button onPress={() => handleSaveProfile()}>
            <ButtonText>SALVAR</ButtonText>
          </Button>
        ) : (
          <ActivityIndicator size="large" />
        )}
        {!!user.error && <Error>{user.error}</Error>}
      </Form>
    </Container>
  );
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Profile.navigationOptions = {
  header: null,
};
