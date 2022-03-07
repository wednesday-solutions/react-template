function isUAT() {
  return process.env.ENVIRONMENT_NAME === 'development' && process.env.NODE_ENV === 'production';
}

function isProd() {
  return process.env.ENVIRONMENT_NAME === 'production' && process.env.NODE_ENV === 'production';
}

function getBranchName() {
  return process.env.BRANCH_NAME ? `/${process.env.BRANCH_NAME}/` : './';
}

function getBasePublicPath() {
  return isUAT() ? getBranchName() : isProd() ? '/react-template/' : '/';
}

module.exports = { getBasePublicPath, isUAT, isProd };
