import {
  browser,
  element,
  ElementFinder,
  ExpectedConditions,
} from "protractor";
import { HomePage, Selectors } from "../pages/home.page";

const homePage = new HomePage();

describe(`Check the Functionality of Linkin page`, () => {
  let title: string;
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    browser.get(" https://brave-goldberg-04dea0.netlify.com/latergear");
  });

  it(`Add the Shopping Carts Icons to Cart`, async () => {
    browser.waitForAngularEnabled(false);
    await homePage.waitForTime(10);
    
    await browser.executeScript('window.scrollTo(0,500);').then(() => {return;});

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

  it(`Should Click View Button and Open a New tab`, async () => {
    const homePageUrl = "https://brave-goldberg-04dea0.netlify.app/latergear";

    const linkElements = await homePage.getLinkElements();
    console.log('linkElements', linkElements.length);
    for (let i = 0; i < linkElements.length; i++) {
      await homePage.clickViewButtonInLinkedElements(linkElements[i]);

      await homePage.waitForTime(10);
      const url = await browser.getCurrentUrl();
      console.log(url);
      expect(url.startsWith(homePageUrl)).toBeFalsy();
      // await browser.close();
      const handles = await browser.getAllWindowHandles();

      browser.driver.switchTo().window(handles[1]);
      browser.driver.close();
      browser.driver.switchTo().window(handles[0]);

    }
  });
});
