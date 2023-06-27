/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://hasan3079hc:230515Mh1@login.s6tiimq.mongodb.net/?retryWrites=true&w=majority",
    JWT_SECRET: "hasanmerve23",
    REFRESH_TOKEN_SECRET: "hasanmerve24",
    BASE_URL: "http://localhost:5000",
  },
};

module.exports = nextConfig;
