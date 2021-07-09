import { homedir } from "os";
import { browser, by, element } from "protractor";
import { TestData } from "../data/testData";
import { HomePage } from "./home.page";

const home: HomePage = new HomePage();
export namespace Selectors {
  export const businessContactID = by.id("contact_settings_link");
  export const fileImageID = by.id("upload-photo");
  export const removeLogo = by.linkText("Remove logo");
  export const firstContactField = by.name("customerFacingPhone1i");
  export const secondContactField = by.name("customerFacingPhone2i");
  export const thirdContactField = by.name("customerFacingPhone3i");
}

export class businessContactPage {
  async clickOnBusinessContactTab(): Promise<boolean> {
    const getBusinessContactElement = element(Selectors.businessContactID);
    if (getBusinessContactElement) {
      await getBusinessContactElement.click();
      return true;
    }
    return false;
  }

  async insertBusinessLogoImage(): Promise<void> {
    const checkImageIsPresent = await element(
      by.className("logoPreview")
    ).isDisplayed();
    if (checkImageIsPresent) {
      await element(Selectors.removeLogo).click();
      await home.waitForTime(3);
      await browser.executeScript(
        "arguments[0].click();",
        element(Selectors.fileImageID)
      );
      await element(Selectors.fileImageID).sendKeys(TestData.uploadImage);
    } else {
      await browser.executeScript(
        "arguments[0].click();",
        element(Selectors.fileImageID)
      );
      await element(Selectors.fileImageID).sendKeys(TestData.uploadImage);
    }
  }

  async removeBusinessLogo(): Promise<void> {
    return element(Selectors.removeLogo).click();
  }
}
