import { TestData } from "../data/testData";
import { HomePage } from "../pages/home.page";
import { myProfilePage } from "../pages/profile.page";

const profile: myProfilePage = new myProfilePage();
const home: HomePage = new HomePage();
describe(`TC-01 - Navigating to myProfile page via Setting menu and Edit "Position Title" information as ${TestData.positionTitleText}`, () => {
  it("should able to click setting tab", async () => {
    const isClicked = await home.clickOnSettingsMenu();
    expect(isClicked).toBeTruthy();
  });

  it(`should able to click on myProfile Page`, async () => {
    const isClicked = await profile.clickOnMyProfileTab();
    expect(isClicked).toBeTruthy();
  });

  it(`should able to click on Edit Button`, async () => {
    await home.waitForTime(3);
    const isClicked = await home.clickOnEditButton();
    expect(isClicked).toBeTruthy();
  });

  it(`should be able to edit the "Position Title" information as ${TestData.positionTitleText}`, async () => {
    await profile.clearAndEnterPositionTitleField(TestData.positionTitleText);
  });

  it(`should be able to save the page`, async () => {
    const isClicked = await home.clickOnSave();
    expect(isClicked).toBeTruthy();
  });

  it(`should verify that ${TestData.positionTitleText} has been updated and displayed on myProfile Summary `, async () => {
    await home.waitForTime(3);
    const fieldText = await profile.getTextOfPositionTitle();
    expect(fieldText).toMatch(TestData.positionTitleText);
  });
});
