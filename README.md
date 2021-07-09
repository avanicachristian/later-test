# Financeit-test-Project

## Stack

Implemented the node modules as package manager and scripted in Javascript/ Typescript language
I have used Protractor/Jasmine and Mocha frameworks for writing and supporting the tests
```
Configuration: Scripts can be executed in Headless mode if uncommented line 12 in conf.js file
```
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
npm myProfileTest 
npm businessContactTest
```
These suites contain TC01 as MyProfileTest and TC02 as Updating BusinessContactTest


### Suites

#### TestCase01

This Test case covers the Functionality of MyProfilePage which covers:
Login to the Application
Go to Settings Menu and Click MyProfile Page,
Click on edit Function,
Clear the Position Title Field text if there is any text present: 
Update or Add the Position Title field with given testData,
Click Save,
Verify the Position Title Text from the Summary Page,
Log out from the application

#### TestCase02: 

This Test Case covers the Functionality of Editing Business Contact Page which covers:
Login to the Application
Go to Settings Menu and Click BusinessContact settings Page,
Click on edit Function,
Check and Verify if there is already an Image Present, if it is present Click on Remove Image,
Insert new Business Logo financeit Image,
Click Save,
Log out from the application


