const base = require("@playwright/test");

export const customtest = base.extend({
  testDataForLogin: {
    email: "melika78karimi@gmail.com",
    password: "melika121378",
  },
});
