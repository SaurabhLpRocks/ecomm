import { environment } from '@environment';

const createUrl = (actionName: string): string => `${environment.apiHost}api/${actionName}`;
const createAuthUrl = (actionName: string): string => `${environment.apiHost}auth/${actionName}`;


export const appApiResources = {
  baseUrl: environment.apiHost,
  accessTokenUrl: '',
  apiUrl: environment.apiHost,
  login: createAuthUrl('login'),
  register: createAuthUrl('register'),
  product: createUrl('product'),
  user: createUrl(''),
  file: createUrl('file'),
  logError: '',
};
