import { browser, element } from "protractor";
import { HomePage, Selectors } from "../pages/home.page";

const homePage = new HomePage();
let homePageUrl = "https://brave-goldberg-04dea0.netlify.com/latergear";
let reDirectedUrl = "https://brave-goldberg-04dea0.netlify.app/latergear";

describe(`Check the Functionality of of Link Button`, () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    browser.get(homePageUrl);
  });

  it(`Should Get Random Products With Link Image`, async () => {
    browser.waitForAngularEnabled(false);
    await homePage.waitForTime(10);
    await browser.executeScript("window.scrollTo(0,500);").then(() => {
      return;
    });
    await homePage.waitForTime(15);
    const formGroupList = await homePage.getAllProductsWithLinkImage();
    const length = formGroupList.length;
    const random = Math.floor(Math.random() * length);
    const formGroup = formGroupList[random];
    await formGroup.click();
    await homePage.waitForTime(5);
    const cartImagePopWindow = element(Selectors.isImageDisplayed);
    expect(cartImagePopWindow).toBeTruthy();
  });
});

describe(`Checking Link Button Window along with Url`, () => {
  it(`Should Click View Button and Open a New tab`, async () => {
    const linkElements = await homePage.getLinkElements();
    for (let i = 0; i < linkElements.length; i++) {
      await homePage.clickViewButtonInLinkedElements(linkElements[i]);
      await homePage.waitForTime(10);
      const url = await browser.getCurrentUrl();
      expect(url.startsWith(reDirectedUrl)).toBeFalsy();
      const handles: string[] = await browser.getAllWindowHandles();
      browser.driver.switchTo().window(handles[1]);
      browser.driver.close();
      browser.driver.switchTo().window(handles[0]);
    }
  });
});
