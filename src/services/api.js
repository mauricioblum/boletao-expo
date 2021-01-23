import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import * as NavigationService from './NavigationService';
import apiURL, { iupayApiVersion } from './consts';

export const publicApi = axios.create({
  baseURL: apiURL,
});

export const privateApi = axios.create({
  baseURL: apiURL,
});

async function getToken() {
  const token = await AsyncStorage.getItem('@Boletao:userToken');
  return token;
}

privateApi.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${await getToken()}`;
    return config;
  },
  async (error) => {
    Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await AsyncStorage.clear();
      NavigationService.navigate('Login');
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  }
);

// IuPay Api Configs

async function getIuPayUserJWTToken() {
  const token = await AsyncStorage.getItem('@Boletao:iuPayUserJWTToken');
  return token;
}

// async function getIuPayUserBasicAuthCredentials() {
//   const token = await AsyncStorage.getItem('@Boletao:iuPayUserBasicAuth');
//   return token;
// }

export const iuPayApi = axios.create({
  baseURL: `https://app-api-nzt7v73sdq-uc.a.run.app/api/${iupayApiVersion}`,
  headers: {
    Authorization: `Basic ${base64.encode('mauricio@test.io:123')}`,
    'x-api-key': '123123123',
    'X-Partner-Id': '5f7ca43060caa5b180c087f5',
  },
});

iuPayApi.interceptors.request.use(
  async (config) => {
    if (!config.url.includes('authenticate')) {
      // eslint-disable-next-line no-param-reassign
      config.headers = Object.assign(config.headers, {
        'x-user-jwt': await getIuPayUserJWTToken(),
      });
      return config;
    }
    return config;
  },
  async (error) => {
    Promise.reject(error);
  }
);
