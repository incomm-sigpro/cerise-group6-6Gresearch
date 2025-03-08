export default {
  app: {
    env: {
      isTest: process.env.NODE_ENV === "test",
      isProd: process.env.NODE_ENV === "production",
      isDev: process.env.NODE_ENV === "development",
    },
  },
  jwt: {
    SECRET_KEY:
      process.env.SECRET_KEY_JWT ||
      "vpztKX8qtDYA$PZ46Oaei!T&jZ4JtA%!cvO5Ov*K#53ZAIy7F4",
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  },
};
