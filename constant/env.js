import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

/** Get Env Set form Config */
const API = publicRuntimeConfig.BASE_API || null;
const API_SSO = publicRuntimeConfig.BASE_API_SSO || null;
const TOKEN_NAME = publicRuntimeConfig.BASE_TOKEN || null;
const URL = publicRuntimeConfig.BASE_URL || null;
const URL_SSO = publicRuntimeConfig.BASE_URL_SSO || null;

/** Setting */
const TIMEOUT = {
  REQUEST: 50000,
};

const ENV = {
  API,
  API_SSO,
  TOKEN_NAME,
  URL,
  URL_SSO,
  TIMEOUT,
};

export default ENV;
