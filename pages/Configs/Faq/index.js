import React from 'react';
import StepHeader from '../../../components/StepHeader';
import PropTypes from 'prop-types';
import { Container, Content, Text, Question, Slogan } from './styles';

export default function Faq() {
  return (
    <Container>
      <StepHeader
        title="FAQ"
        subtitle="Olá, seja bem vindo ao FAQ do Boletão. Aqui você tem acesso às perguntas mais frequentes. Caso ainda tenha alguma dúvida, pode falar conosco no menu“Ajuda”, em Configurações."
      />
      <Content>
        <Question>Como cadastrar meus boletos no Boletão?</Question>
        <Text>
          Ao se cadastrar no Boletão, você receberá um novo email para recolher
          todas as suas cobranças bancárias.
        </Text>
        <Text>
          Para que todos os boletos que você recebe por email possam aparecer no
          seu app, você pode cadastrar esse email direto nas empresas onde você
          possui conta. Exemplo: se você possui uma conta de luz na Enel, você
          pode solicitar no portal da Enel para receber as suas faturas nesse
          email gerado pelo Boletão.
        </Text>
        <Text>
          Você faz isso uma única vez, e depois todas as suas contas irão
          aparecer no seu app! É muito prático!
        </Text>
        <Text>
          No entanto, se você receber algum boleto em algum outro email, você
          pode encaminhar esse boleto para o seu email do Boletão e o mesmo irá
          aparecer no seu app.
        </Text>
        <Text>
          Lembre-se: todos os boletos que chegam por email precisam ser enviados
          (por você ou pela empresa de cobrança) para o email que você recebeu
          do Boletão para que fiquem disponíveis no seu app!
        </Text>
        <Text>
          Caso receba algum email que contenha outras informações, além da
          fatura, não se preocupe! Estaremos encaminhando para seu email
          principal!
        </Text>
        <Text>
          Além dos boletos que chegam por email, nós temos a ferramenta de DDA,
          que busca nos órgãos competentes todos os boletos registrados em seu
          nome.
        </Text>
        <Text>
          Além disso, você pode cadastrar manualmente seus boletos pelo leitor
          de código de barras ou digitando o código de barras. O cadastro de
          boletos pode ser feito no menu “Boletos”, “Beneficiários”, ou no menu
          "Meu Boletão".
        </Text>

        <Question>Como usar o Boletão?</Question>
        <Text>
          No menu "Boletos", você consegue visualizar todos os seus boletos do
          mês vigente. São eles:
        </Text>
        <Text>- Boletos vencendo no dia;</Text>
        <Text>- Boletos vencendo nos próximos 7 dias;</Text>
        <Text>
          - Boletos emitidos recentemente (saiba tudo o que está sendo gerado em
          seu nome);
        </Text>
        <Text>- Demais pagamentos do mês.</Text>
        <Text>
          No menu "Beneficiários", você consegue visualizar todas as suas
          cobranças separadas por cada Beneficiário (cada empresa que você
          possui algum pagamento).
        </Text>
        <Text>
          No menu "Boletos", ao clicar em cima de cada conta, você poderá
          selecionar os boletos que deseja incluir em seu Boletão.
        </Text>
        <Text>
          No menu "Meu Boletão", você visualiza todos os seus "Boletões" criados
          e ao entrar em cada Boletão, você consegue adicionar novos boletos e
          finalizar o pagamento do seu Boletão. Esse pagamento que pode ser
          efetuado, utilizando o saldo que você tem no seu banco, ou solicitando
          crédito dentro do Boletão.
        </Text>
        <Text>Algumas dicas sobre o seu Boletão:</Text>
        <Text>
          - Você poderá adicionar novos boletos ao seu Boletão até fazer o
          fechamento dele. Após fechado e emitido o Boletão, você não poderá
          cadastrar novos boletos. Mas não se preocupe! Você pode criar um novo
          Boletão sempre que precisar.
        </Text>
        <Text>
          - O seu Boletão terá como data de vencimento um dia antes do
          vencimento do primeiro boleto cadastrado no Boletão.
        </Text>
        <Text>
          - Para pagar o seu Boletão, você irá receber o novo boleto (com o
          valor total dos boletos cadastrados no Boletão), via email. Você pode
          pagá-lo utilizando saldo em sua conta bancária de preferência, ou se
          precisar de crédito, pode solicitar na aba "Meu Boletão".
        </Text>
        <Text>
          - Se desejar pagar uma conta individual em seu banco de preferência,
          ao clicar em "Copiar código de barras" você terá copiado o código de
          barras e poderá migrar para seu banco de preferência e efetuar o
          pagamento.
        </Text>

        <Question>Como faço para criar o Meu Boletão?</Question>
        <Text>
          Para criar o seu Boletão, você acessa o menu "Boletos" e seleciona
          todos os boletos que deseja incluir no seu Boletão. Para isso, basta
          entrar em cada conta e selecionar: "Adicionar ao Meu Boletão".
        </Text>
        <Text>
          Ao criar o seu Boletão, você pode finalizar o pagamento utilizando o
          saldo em conta do seu banco de preferência ou solicitando crédito via
          Boletão.
        </Text>
        <Text>
          Após confirmado o pagamento do seu Boletão (via saldo ou via crédito),
          você não precisa mais se preocupar. O Boletão cuidará de todos os seus
          boletos e irá liquidá-los para você. Os comprovantes serão
          disponibilizados via app e via email para que você possa salvá-los e
          acessá-los quando precisar.
        </Text>
        <Text>
          Atenção: Lembre-se de criar o seu Boletão e efetuar o seu pagamento
          para que seus boletos sejam liquidados. Sem esse passo a passo seus
          boletos não serão liquidados individualmente e ficarão pendentes de
          pagamento.
        </Text>
        <Question>Como funciona o crédito no Boletão?</Question>
        <Text>
          Está precisando de crédito para pagar as suas contas? O Boletão pode
          te ajudar!
        </Text>
        <Text>
          Após criar o seu Boletão, você tem a opção de solicitar crédito.
          Iremos fazer a solicitação de alguns dados via e-mail para que
          possamos enviar para análise, junto com nossos parceiros de crédito.
        </Text>
        <Text>
          Após aprovado, você receberá o dinheiro em sua conta bancária de
          preferência, e poderá efetuar o pagamento do seu Boletão utilizando
          esse dinheiro.
        </Text>
        <Text>
          Efetuado o pagamento do seu Boletão, nós iremos liquidar todas as suas
          contas cadastradas no seu Boletão.
        </Text>
        <Text>
          Atenção: Caso o pagamento do Boletão não seja efetuado, os seus
          boletos não serão liquidados e ficarão pendentes de pagamento.
        </Text>
        <Text>
          Você pode solicitar crédito sempre que precisar. Estamos aqui para te
          ajudar!
        </Text>
        <Question>Como acompanhar se o Boletão pagou meu boleto?</Question>
        <Text>
          No menu "Boletos", você acompanha todos seus boletos a vencer e todos
          os seus boletos pagos no mês vigente. Ao clicar nos boletos pagos,
          estarão disponíveis os comprovantes de pagamento dos boletos que você
          incluiu no seu Boletão (que foram pagos pelo Boletão). Esses
          comprovantes e as informações de pagamento também estarão disponíveis
          no menu “Meu Boletão”. Já no menu “Notificações”, você receberá em
          tempo real todas as informações de movimentações do seu Boletão.
        </Text>
        <Question>
          Posso usar o Boletão apenas para gerenciar os meus boletos?
        </Question>
        <Text>
          Sim! Você pode apenas receber ou cadastrar seus boletos no Boletão e,
          em cada data de vencimento, irá receber notificações sobre o
          vencimento dos seus pagamentos.
        </Text>
        <Text>
          Mas lembre-se sempre: o Boletão só irá pagar os seus boletos, se você
          selecioná-los e adicioná-los ao seu Boletão. Assim você faz um único
          pagamento, e deixa pra gente cuidar de cada um dos seus boletinhos.
        </Text>
        <Slogan>USE O BOLETÃO! TENHA UMA VIDA COM MENOS BOLETOS!</Slogan>
      </Content>
    </Container>
  );
}

Faq.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Faq.navigationOptions = {
  header: null,
};
