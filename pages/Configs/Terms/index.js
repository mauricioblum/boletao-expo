import React from 'react';
import StepHeader from '../../../components/StepHeader';
import PropTypes from 'prop-types';
import { Container, Content, Text } from './styles';

export default function Terms() {
  return (
    <Container>
      <StepHeader title="Termos de Uso" />
      <Content>
        <Text>Termos de Serviço do Google</Text>
        <Text>
          Última modificação: 25 de outubro de 2017 (visualizar versões
          arquivadas) Bem-vindo ao Google!
        </Text>
        <Text>
          Agradecemos por usar nossos produtos e serviços (“Serviços”). Os
          Serviços serão fornecidos pelo Google LLC (“Google”), localizado em
          1600 Amphitheatre Parkway, Mountain View, CA 94043, Estados Unidos.
        </Text>
        <Text>
          Ao usar nossos Serviços, você está concordando com estes termos.
          Leia-os com atenção.
        </Text>
        <Text>
          Nossos Serviços são muito diversos, portanto, às vezes, podem
          aplicar-se termos adicionais ou exigências de produtos (inclusive
          exigências de idade). Os termos adicionais estarão disponíveis com os
          Serviços relevantes e esses termos adicionais se tornarão parte de
          nosso contrato com você, caso você use esses Serviços.
        </Text>
        <Text>
          Ao usar nossos Serviços, você está concordando com estes termos.
          Leia-os com atenção.
        </Text>
      </Content>
    </Container>
  );
}

Terms.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Terms.navigationOptions = {
  header: null,
};
