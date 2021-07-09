import { TestData } from "../data/testData";
import { businessContactPage } from "../pages/businessContact.page";
import { HomePage } from "../pages/home.page";

const businessPage: businessContactPage = new businessContactPage();
const home: HomePage = new HomePage();
describe(`TC-02 - Navigating to Business Contact page via Settings menu, Upload a Business logo and Enter contact information`, () => {
  it("should able to click setting tab", async () => {
    const isClicked = await home.clickOnSettingsMenu();
    expect(isClicked).toBeTruthy();
  });

  it(`should able to click on business contact Page`, async () => {
    const isClicked = await businessPage.clickOnBusinessContactTab();
    expect(isClicked).toBeTruthy();
  });

  it(`should able to click on Edit Button`, async () => {
    const isClicked = await home.clickOnEditButton();
    expect(isClicked).toBeTruthy();
  });

  it(`should insert Financeit Business Logo`, async () => {
    await home.waitForTime(5);
    // await businessPage.removeBusinessLogo();
    const fileUploaded = await businessPage.insertBusinessImage();
    await home.waitForTime(5);
  });

  it(`should be able to save the page`, async () => {
    const isClicked = await home.clickOnSave();
    expect(isClicked).toBeTruthy();
  });
});
