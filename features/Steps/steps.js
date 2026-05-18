import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
// Given(
//   "Login in website with {emailAddress} and {password}",
//   async function (emailAddress, password) {
//     console.log("emailAddress", emailAddress);
//     console.log("password", password);
//   },
// );

Given(
  "Login in website with {emailAddress} and {password}",
  async function (emailAddress, password) {
    // console.log("emailAddress", emailAddress);
    // console.log("password", password);
    return "pending";
  },
);

When("Add {string} to cart", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("Verify {string} is added to cart", function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("Enter vlaid detail and place the order", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("Verify the order is placed successfully", function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
