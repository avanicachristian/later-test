import { by, element } from "protractor";

export namespace Selectors {
  export const profileTab = by.id("profile_settings_link");
  export const positionTitleID = by.name("positionTitle");
  export const fieldText = by.xpath("//div//ul/li[3]");
}

export class myProfilePage {
  async clickOnMyProfileTab(): Promise<boolean> {
    const getProfileElement = element(Selectors.profileTab);
    if (getProfileElement) {
      await getProfileElement.click();
      return true;
    }
    return false;
  }

  async clearAndEnterPositionTitleField(
    positionTitleText: string
  ): Promise<void> {
    const field = element(Selectors.positionTitleID);
    await field.clear();
    await field.sendKeys(positionTitleText);
  }

  async getTextOfPositionTitle(): Promise<string> {
    const fieldText = element(Selectors.fieldText).getText();
    return fieldText;
  }
}
