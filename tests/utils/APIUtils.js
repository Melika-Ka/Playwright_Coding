class APIUtils {
  constructor(apiContext, loginPayLoad) {
    this.loginPayLoad = loginPayLoad;
    this.apiContext = apiContext;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayLoad,
      }
    );
    // expect(loginResponse.ok()).toBeTruthy();
    const loginDataJson = await loginResponse.json();
    console.log(loginDataJson);
    const token = await loginDataJson.token;
    console.log("token", token);
    return token;
  }
  ///
  async createOrder(orderPaLoad) {
    let response = {};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPaLoad,
        headers: {
          "Content-Type": "application/json",
          Authorization: response.token,
        },
      }
    );
    // expect(orderResponse.ok()).toBeTruthy();
    const orderDataJson = await orderResponse.json();
    console.log("orderDataJson", orderDataJson);
    const orderId = await orderDataJson.orders[0];
    console.log("orderId : ", orderId);
    response.orderId = orderId;
    return response;
  }
}
module.exports = APIUtils;
