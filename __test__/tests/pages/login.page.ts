import { by, element } from "protractor";

export namespace Selectors {
  export const username = by.id("login");
  export const password = by.id("password");
  export const loginButton = by.css(".btn.btn-primary");
}

export class LoginPage {
  async enterUsername(username: string): Promise<void> {
    return element(Selectors.username).sendKeys(username);
  }

  async enterPassword(password: string): Promise<void> {
    return element(Selectors.password).sendKeys(password);
  }

  async clickOnLoginButton(): Promise<void> {
    return element(Selectors.loginButton).click();
  }
}
