function isUAT() {
  return process.env.ENVIRONMENT_NAME === 'development' && process.env.NODE_ENV === 'production';
}

function isProd() {
  return process.env.ENVIRONMENT_NAME === 'production' && process.env.NODE_ENV === 'production';
}

function getBranchName() {
  return process.env.BRANCH_NAME ? `/${process.env.BRANCH_NAME}/` : './';
}

function getDefaultPublicPath() {
  return isProd() ? '/' : '/';
}

function getBasePublicPath() {
  return isUAT() ? getBranchName() : getDefaultPublicPath();
}

module.exports = { getBasePublicPath, isUAT, isProd };
