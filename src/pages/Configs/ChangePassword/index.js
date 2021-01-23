import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StepHeader from '../../../components/StepHeader';
import { UserTypes } from 'store/ducks/user';

import {
  Container,
  Form,
  Label,
  InputPassword,
  Button,
  ButtonText,
  AlertError,
} from './styles';

export default function ChangePassword() {
  const [error, setError] = useState(false);
  const [pass, setPass] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const loading = useSelector((state) => state.user.loading);
  const errorResponse = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: UserTypes.CLEAR_ERROR });
  }, []);

  function handleChange(text, field) {
    setPass({ ...pass, [field]: text });
  }

  function handleSaveProfile() {
    if (pass.new === pass.confirm) {
      setError(false);
      dispatch({
        type: UserTypes.CHANGE_PASSWORD_REQUEST,
        oldPass: pass.current,
        newPass: pass.new,
        newPassConfirm: pass.confirm,
      });
    } else {
      setError(true);
    }
  }

  return (
    <Container>
      <StepHeader title="Alterar Senha" />
      <Form>
        <Label>SENHA ATUAL</Label>
        <InputPassword
          placeholder="DIGITE SUA SENHA ATUAL"
          value={pass.current}
          onChangeText={(text) => handleChange(text, 'current')}
        />
        <Label>NOVA SENHA</Label>
        <InputPassword
          placeholder="DIGITE A NOVA SENHA"
          value={pass.new}
          onChangeText={(text) => handleChange(text, 'new')}
        />
        <Label>REPITA A NOVA SENHA</Label>
        <InputPassword
          placeholder="DIGITE NOVAMENTE"
          value={pass.confirm}
          onChangeText={(text) => handleChange(text, 'confirm')}
        />
        {error && <AlertError>SENHAS DEVEM SER IGUAIS!</AlertError>}
        {!!errorResponse && <AlertError>{errorResponse.message}</AlertError>}
        {!loading ? (
          <Button onPress={() => handleSaveProfile()}>
            <ButtonText>SALVAR</ButtonText>
          </Button>
        ) : (
          <ActivityIndicator size="small" color="#494bf5" />
        )}
      </Form>
    </Container>
  );
}

ChangePassword.navigationOptions = {
  header: null,
};
