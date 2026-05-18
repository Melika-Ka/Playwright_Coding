
Feature: Ecommerce
  Scenario: Buy a product from ecommerce website
        Given Login in website with "melika.karimi.work@gmail.com" and "Meli@123"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is added to cart
        When Enter valid detail and place the order
        Then Verify the order is placed successfully