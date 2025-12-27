// src/config/env.ts
const ENV = {
  dev: {
    apiUrl: 'edacious-closer-catrice.ngrok-free.dev', // Seu backend local
    // apiUrl: 'https://barberboss.loca.lt', // LocalTunnel
    timeout: 30000,
  },
  prod: {
    apiUrl: 'edacious-closer-catrice.ngrok-free.dev', // Produção futura
    timeout: 30000,
  },
};

const getEnv = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnv();