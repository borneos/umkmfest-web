import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

/** Get Env Set form Config */
const API = publicRuntimeConfig.BASE_API || null;

/** Setting */
const TIMEOUT = {
  REQUEST: 50000,
};

const ENV = {
  API,
  TIMEOUT,
};

export default ENV;
