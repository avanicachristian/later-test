# Later-test-Project

## Stack

Implemented the node modules as package manager and scripted in Javascript/ Typescript language
I have used Protractor/Jasmine and Mocha frameworks for writing and supporting the tests

Reports:
I have used protractor-html-screenshot-reporter to show final results along with the screenshots

## Installation

```sh
npm install or yarn install
npm install protractor
npm i jasmine or npm install --save-dev @types/jasmine
webdriver-manager update or  node ./node_modules/protractor/bin/webdriver-manager update
```

### How to Run
Execute the following command: `npm {suiteName}`

```
npm linkinBioFunctionality
```

These suites contain both TC01 and TC02 under it as a result it will test both of them in succession


### Suites

#### TestCase01

This Test case covers the Functionality of Cart Button which covers:
Random selection of products with Cart Image 
Getting the title of Product name to ensure correct product is selected
Checking Card Button Status- Enabled or Disabled: 
It should be disabled at first when the product is not selected for Add to Cart Button
Select the products and select any one listings from dropdowns menu
After adding product in Cart, the Add to Cart Button should be enabled
Checkout the Product

#### TestCase02: 

This Test Case covers the Functionality of Link Button which covers:
Random selection of products with Link Image
Check Link Button window along with URl

#### Future Test Cases: 

Click on Reset Button
If given a correct url address to check, then tests can be optimised further to check product's status
Adding/Subtracting the products from Shopping cart Card
Checking the Subtotal Price with Actual Price

### Issues Found:

The Link Image Url's was incorrect as it was redirecting to wrong url for both the products
The Reports and Screenshots can be found under Reports Folder in the script as well as under Issues Tab
