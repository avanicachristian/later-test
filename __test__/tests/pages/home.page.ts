import { browser, by, element } from "protractor";

export namespace Selectors {
  export const settings = by.linkText("Settings");
  export const editButton = by.cssContainingText("button", "Edit");
  export const save = by.cssContainingText("button", "Save");
}

export class HomePage {
  async waitForTime(timeUnitsInSeconds: number): Promise<void> {
    return browser.sleep(timeUnitsInSeconds * 1000);
  }

  async clickOnSettingsMenu(): Promise<boolean> {
    await element(Selectors.settings).click();
    return element(Selectors.settings).isDisplayed();
  }

  async clickOnEditButton(): Promise<boolean> {
    const getEditButtonElement = element(Selectors.editButton);
    if (getEditButtonElement) {
      await getEditButtonElement.click();
      return true;
    }
    return false;
  }

  async clickOnSave(): Promise<boolean> {
    const getSaveElement = element(Selectors.save);
    if (getSaveElement) {
      await getSaveElement.click();
      return true;
    }
    return false;
  }
}
