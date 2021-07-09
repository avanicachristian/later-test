import { browser } from "protractor";
import { TestData } from "../data/testData";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

describe(`Login to the Application with ${TestData.username} on ${TestData.loginPageUrl}`, () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    browser.get(TestData.loginPageUrl);
  });
  it("should able to login", async () => {
    const login: LoginPage = new LoginPage();
    const home: HomePage = new HomePage();
    await login.enterUsername(TestData.username);
    await login.enterPassword(TestData.password);
    await login.clickOnLoginButton();
    await home.waitForTime(2);
  });
});
