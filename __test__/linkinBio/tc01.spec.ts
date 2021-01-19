import { browser, element, ElementFinder } from "protractor";
import { HomePage, Selectors } from "../pages/home.page";

const homePage = new HomePage();
let homePageUrl = "https://brave-goldberg-04dea0.netlify.com/latergear";
let title: string;

describe(`Check the Functionality of Cart Button`, () => {
  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    browser.get(homePageUrl);
  });

  it(`Should Get Random Products With Cart Image`, async () => {
    browser.waitForAngularEnabled(false);
    await homePage.waitForTime(10);
    const formGroupList = await homePage.getAllProductsWithCartImage();
    const length = formGroupList.length;
    const random = Math.floor(Math.random() * length);
    const formGroup = formGroupList[random];
    await formGroup.click();
    await homePage.waitForTime(5);
    const cartImagePopWindow = element(Selectors.isImageDisplayed);
    expect(cartImagePopWindow).toBeTruthy();
  });

  it(`Get the Title of the Cart Items`, async () => {
    title = await homePage.getTitleOfPopUpWindow();
    expect(title).toBeTruthy();
  });
});

describe(`The Products must be able to Added to the Cart and CheckOut`, () => {
  it(`Check Cart Button Status`, async () => {
    const addToCartButton: ElementFinder = element(
      Selectors.checkAddToCartButton
    );
    const isAddToCartBtnDisabled = await homePage.checkAddToCartButtonIsDisabled(
      addToCartButton
    );
    if (isAddToCartBtnDisabled) {
      await homePage.selectAllDropDowns();
    }
    const newAddToCartBtnIsDisabled = await homePage.checkAddToCartButtonIsDisabled(
      addToCartButton
    );
    expect(newAddToCartBtnIsDisabled).toBeFalsy();
    await addToCartButton.click();
    await homePage.waitForTime(5);
  });
  it(`Check Items are displayed in the Checkout Conatiner and Checkout`, async () => {
    const cartContainer = await homePage.getCartContainer();
    const cartContainerText = await cartContainer.getText();
    expect(cartContainerText.includes(title)).toBeTruthy();
    const listOfCartItems = await homePage.getLiItemsInContainer(cartContainer);
    expect(listOfCartItems.length).toBeGreaterThanOrEqual(1);
    await homePage.clickOnCheckOutButton(cartContainer);
    await homePage.waitForTime(8);
  });
});
