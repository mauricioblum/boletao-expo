import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import StepHeader from '../../components/StepHeader';
import { publicApi } from 'services/api';
import {
  Container,
  Form,
  Label,
  LabelError,
  InputCpf,
  InputName,
  InputEmail,
  InputMobile,
  InputPassword,
  InputConfirmPassword,
  Button,
  ButtonText,
  WrapperView,
} from './styles';

export default function SignupForm({ navigation }) {
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    mobile: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleInput(field, text) {
    setFormFields({ ...formFields, [field]: text });
  }

  async function handleSignup() {
    setLoading(true);
    setError('');
    try {
      await publicApi.post(`/profile/sign-up`, {
        name: formFields.name,
        email: formFields.email,
        cpf: formFields.cpf,
        password: formFields.password,
        mobile: formFields.mobile,
        passwordConfirmation: formFields.confirmPassword,
      });
      setLoading(false);
      navigation.navigate('BankSlipSuccess', {
        message: 'Conta criada com sucesso!',
        destination: 'Login',
      });
    } catch (err) {
      setError(`Erro! ${err.response.data.message}`);
      setLoading(false);
    }
  }

  return (
    <Container>
      <StepHeader
        title="Crie sua Conta"
        subtitle="Cadastra-se agora e nunca mais esqueça dos seus boletos!"
      />

      <Form>
        <Label>Nome</Label>
        <InputName
          value={formFields.name}
          onChangeText={(text) => handleInput('name', text)}
        />
        <Label>Email</Label>
        <InputEmail
          value={formFields.email}
          onChangeText={(text) => handleInput('email', text)}
        />
        <Label>Telefone</Label>
        <InputMobile
          value={formFields.mobile}
          onChangeText={(text) => handleInput('mobile', text)}
        />
        <Label>CPF</Label>
        <InputCpf
          value={formFields.cpf}
          onChangeText={(text) => handleInput('cpf', text)}
        />
        <Label>Senha</Label>
        <InputPassword
          value={formFields.password}
          onChangeText={(text) => handleInput('password', text)}
        />
        <Label>Confirmar Senha</Label>
        <InputConfirmPassword
          value={formFields.confirmPassword}
          onChangeText={(text) => handleInput('confirmPassword', text)}
        />
        {!loading ? (
          <Button onPress={() => handleSignup()}>
            <ButtonText>CADASTRAR</ButtonText>
          </Button>
        ) : (
          <WrapperView>
            <ActivityIndicator size="large" />
          </WrapperView>
        )}
        {!!error && (
          <WrapperView>
            <LabelError>{error}</LabelError>
          </WrapperView>
        )}
      </Form>
    </Container>
  );
}

SignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SignupForm.navigationOptions = {
  header: null,
};
