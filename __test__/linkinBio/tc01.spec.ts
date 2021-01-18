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


    const addToCartButton: ElementFinder = element(
      Selectors.checkAddToCartButton
    );
  it(`Check Cart Button Status`, async () => {
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
    // click on Add to cart
    await addToCartButton.click();
    await homePage.waitForTime(5);
  });
   
    it(`Check Items are displayed in the Checkout Conatiner and Checkout`, async () => {
    const cartContainer = await homePage.getCartContainer();
    const cartContainerText = await cartContainer.getText();
    console.log('cartContainerText', cartContainerText);
    
    expect(cartContainerText.includes(title)).toBeTruthy();

    const listOfCartItems = await homePage.getLiItemsInContainer(cartContainer);

    expect(listOfCartItems.length).toBeGreaterThanOrEqual(1);
    await homePage.clickOnCheckOutButton (cartContainer);
    await homePage.waitForTime(8);
    await homePage.clickOnCheckOutButton (cartContainer);
    await homePage.waitForTime(8);
    });


    // }

});
