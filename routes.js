import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './pages/Main';
import Login from './pages/Login';
import RegisterBankSlipMenu from './pages/RegisterBankSlipMenu';
import RegisterBankSlipForm from './pages/RegisterBankSlipForm';
import BankSlips from './pages/BankSlips';
import BankSlipItem from './pages/BankSlips/BankSlipItem';
import MyBigBankSlips from './pages/MyBigBankSlips';
import BigBankSlipItem from './pages/MyBigBankSlips/BigBankSlipItem';
import AddBigSlipsForm from './pages/MyBigBankSlips/AddBigSlipsForm';
import Configs from './pages/Configs';
import Profile from './pages/Configs/Profile';
import ChangePassword from './pages/Configs/ChangePassword';
import Terms from './pages/Configs/Terms';
import Help from './pages/Configs/Help';
import Faq from './pages/Configs/Faq';
import Notifications from './pages/Notifications';
import AutomaticCpfSearch from './pages/AutomaticCpfSearch';
import BarcodeForm from './pages/BarcodeForm';
import BankSlipSuccess from './pages/BankSlipSuccess';
import UnifiedPayment from './pages/UnifiedPayment';
import UnifiedPaymentMethod from './pages/UnifiedPaymentMethod';
import BarcodeScanner from './pages/BarcodeScanner';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/ForgotPassword/NewPassword';
import SignupForm from './pages/SignupForm';
import EditBankSlipForm from './pages/EditBankSlipForm';
import IuPay from './pages/IuPay';
import Beneficiaries from './pages/Beneficiaries';
import BeneficiaryDetailsScreen from './pages/BeneficiaryDetailsScreen';
import IuPaySlipDetails from './pages/IuPaySlipDetails';
import PaymentReceiptScreen from './pages/PaymentReceiptScreen';
import ReceiptScreen from './pages/ReceiptScreen';
import BigSlipDetails from './pages/BigSlipDetails';

import { colors } from './styles';

const bottomTabOptions = {
  navigationOptions: {
    header: null,
    headerMode: 'none',
  },
  tabBarOptions: {
    style: {
      backgroundColor: colors.background,
      paddingBottom: 5,
    },
    labelStyle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 10,
      fontStyle: 'normal',
      letterSpacing: -0.53,
      textAlign: 'center',
      color: colors.black,
    },
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator tabBarOptions={bottomTabOptions}>
      <Tab.Screen name="IuPay" component={IuPay} />
      <Tab.Screen name="Beneficiaries" component={Beneficiaries} />
      <Tab.Screen name="MyBigBankSlips" component={MyBigBankSlips} />
      <Tab.Screen name="Configs" component={Configs} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

// eslint-disable-next-line react/prop-types
const Routes = ({ userLogged = false }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={userLogged ? 'User' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="User" component={UserTabs} />
        <Stack.Screen
          name="AutomaticCpfSearch"
          component={AutomaticCpfSearch}
        />
        <Stack.Screen name="BarcodeForm" component={BarcodeForm} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="BankSlips" component={BankSlips} />
        <Stack.Screen
          name="RegisterBankSlipMenu"
          component={RegisterBankSlipMenu}
        />
        <Stack.Screen
          name="RegisterBankSlipForm"
          component={RegisterBankSlipForm}
        />
        <Stack.Screen name="BankSlipSuccess" component={BankSlipSuccess} />
        <Stack.Screen name="UnifiedPayment" component={UnifiedPayment} />
        <Stack.Screen
          name="UnifiedPaymentMethod"
          component={UnifiedPaymentMethod}
        />
        <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ route: 'resetPassword/:token' }}
        />
        <Stack.Screen name="BankSlipItem" component={BankSlipItem} />
        <Stack.Screen name="SignupForm" component={SignupForm} />
        <Stack.Screen name="EditBankSlipForm" component={EditBankSlipForm} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="BigBankSlipItem" component={BigBankSlipItem} />
        <Stack.Screen name="AddBigSlipsForm" component={AddBigSlipsForm} />
        <Stack.Screen name="IuPaySlipDetails" component={IuPaySlipDetails} />
        <Stack.Screen
          name="BeneficiaryDetailsScreen"
          component={BeneficiaryDetailsScreen}
        />
        <Stack.Screen
          name="PaymentReceiptScreen"
          component={PaymentReceiptScreen}
        />
        <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
        <Stack.Screen name="BigSlipDetails" component={BigSlipDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
