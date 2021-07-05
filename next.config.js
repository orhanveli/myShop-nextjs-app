module.exports = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.API_KEY ?? '',
    baseUrl: process.env.API_URL || 'http://localhost:5100'
  }
};
