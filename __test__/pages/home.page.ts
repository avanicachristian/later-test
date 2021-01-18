import { relative } from "path";
import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  protractor,
  WebElement,
} from "protractor";

export namespace Selectors {
  export const divTagName = "div";
  export const oneCard = by.className("o--card");
  export const allShoppingCartList = by.className("tLb--content__grid");
  export const shoppingCart = by.css('img[alt="Shopify Link"]');
  export const closeModelIcon = by.css('img[alt="Close Modal Button"]');
  export const linkCart = by.css('img[alt="Link"]');
  export const linkItems = by.css("li[class='cDT--list__item']");
  export const linkViewButton  = by.tagName ("a");
  export const popUpWindowTitle = by.css('p[class="cDT--post__title"]');
  export const isImageDisplayed = by.id("post-image");
  export const checkAddToCartButton = by.css(
    'div[class="cDT--post__btn"] a[role="button"]'
  );
  export const dropDownList = by.css('select[class="o--form__select"]');
  export const openCartCard = by.className("cSC--container  is--open ");
  export const checkOut = by.linkText("Checkout");
}

export class HomePage {
  // async clickOnShoppingCartButton(): Promise <void> {
  //      element.all (Selectors.shoppingCart).get(1).click();
  // //    return element (Selectors.isImageDisplayed).isDisplayed();
  // }
  async TP<T>(ele: ElementFinder | ElementArrayFinder) {
    return (ele as any) as Promise<T>;
  }

  async waitForTime(timeUnitsInSeconds: number): Promise<void> {
    return browser.sleep(timeUnitsInSeconds * 1000);
  }

  async checkAddToCartButtonIsDisabled(
    addToCartButton: WebElement
  ): Promise<boolean> {
    const classes = await addToCartButton.getAttribute("class");
    return classes.includes("o--btn--disabled");
  }

  async getTitleOfPopUpWindow(): Promise<string> {
    return element(Selectors.popUpWindowTitle).getText();
  }
  async selectAllDropDowns(): Promise<void> {
    const selectDropdownsList: WebElement[] = await element
      .all(Selectors.dropDownList)
      .getWebElements();

    for (let index = 0; index < selectDropdownsList.length; index++) {
      const option = selectDropdownsList[index];
      const selectAllOptions: WebElement[] = await option.findElements(
        by.tagName("option")
      );

      await selectAllOptions[1].click();
    }
  }

  async getAllProductsWithCartImage(): Promise<WebElement[]> {
    return element.all(Selectors.shoppingCart).getWebElements();
  }

  async getAllProductsWithLinkImage(): Promise<WebElement[]> {
    return element.all(Selectors.linkCart).getWebElements();
  }

  async getLinkElements(): Promise<WebElement[]> {
    return element.all(Selectors.linkItems).getWebElements();
  }

  async clickViewButtonInLinkedElements (webElement: WebElement): Promise<void> {
    const viewButton = await webElement.findElement (Selectors.linkViewButton);
    return browser.actions().mouseMove(viewButton).click().perform();

  }

  getCartContainer(): WebElement {
    return element(Selectors.openCartCard).getWebElement();
  }

  async getLiItemsInContainer(container: WebElement): Promise<WebElement[]> {
    const ulElement = await container.findElement(by.tagName("ul"));
    return ulElement.findElements(by.tagName("li"));
  }

  async clickOnCheckOutButton(container: WebElement): Promise<void> {
    const footer = await container.findElement(by.tagName("footer"));

    const checkoutBtn = await footer.findElement(Selectors.checkOut);
    return browser.actions().mouseMove(checkoutBtn).click().perform();
  }

  async closeModel(): Promise<void> {
    return element(Selectors.closeModelIcon).click();
  }
}
