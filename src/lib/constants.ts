// Environment
const environment = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV;
const localEnv = environment === "local";
const prodEnv = ["production", "prod"].includes(environment);
const devEnv = !localEnv && !prodEnv;
const devOrLocalEnv = devEnv || localEnv;
// Core Web App (CWA)
const cwaServerHost = process.env.CWA_SERVER_HOST || "http://localhost";
const cwaServerPort = process.env.CWA_SERVER_PORT || 3000;
const cwaServerUrl = process.env.NEXT_PUBLIC_CWA_SERVER_URL || `${cwaServerHost}:${cwaServerPort}`;

export const constants = Object.freeze({
  // Environment
  env: {
    dev: devEnv,
    local: localEnv,
    devOrLocal: devOrLocalEnv,
    prod: prodEnv,
  },
  // CWA
  cwa: {
    host: cwaServerHost,
    port: cwaServerPort,
    url: cwaServerUrl,
  },
  // Routes
  routes: {
    anchor: "#",
    home: "/",
    api: {
      base: "/api/",
    },
  },
  // Zora Network
  zora: {
    useTestNet: process.env.NEXT_PUBLIC_USE_ZORA_TESTNET === "true",
  },
});
