function isTestEnv() {
  return !!process.env.JEST_WORKER_ID || process.env.TEST;
}

module.exports.isTestEnv = isTestEnv;
