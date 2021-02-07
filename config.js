/**
 * /* creating and export the configuration variables
 *
 * @format
 */
let environments = {};
// staging defalult
environments.staging = {
  port: 3000,
  evnName: "staging",
};

environments.production = {
  port: 5000,
  envName: "production",
};

// we will decide which object to export

const currentEnv = typeof (process.env.NODE_ENV == "string"
  ? process.env.NODE_ENV.toLowerCase()
  : "");

// check the current eve matches wit our defined env

const envToExport =
  typeof environments[currentEnv] == "object"
    ? environments[currentEnv]
    : environments.staging;

module.exports = envToExport;
