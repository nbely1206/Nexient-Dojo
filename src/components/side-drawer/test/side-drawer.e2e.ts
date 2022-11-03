import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('side-drawer', () => {
  it('should open when the toggleDrawer method is triggered externally and the sidedrawer is currently closed', async () => {
    // Arrange 
    const page: E2EPage = await newE2EPage();
    await page.setContent('<side-drawer></side-drawer>');
    const sideDrawer: E2EElement = await page.find('side-drawer');
    const asideElement: E2EElement = await page.find('side-drawer >>> aside');
    const asideElementVisibleBefore = await asideElement.isVisible();

    // Act
    await sideDrawer.callMethod('toggleDrawer');
    await page.waitForChanges();

    // Assert
    const asideElementVisibleAfter = await asideElement.isVisible();
    expect(asideElementVisibleAfter).toBe(!asideElementVisibleBefore);
  });
  it('should close when the toggleDrawer method is triggered externally and the sidedrawer is currently open', async () => {
    // Arrange
    const page: E2EPage = await newE2EPage();
    await page.setContent('<side-drawer opened></side-drawer>');
    const asideElement: E2EElement = await page.find('side-drawer >>> aside');
    const asideElementVisibleBefore = await asideElement.isVisible();

    // Act
    const closeButton = await page.find('side-drawer >>> #close-button');
    await closeButton.click();
    await page.waitForChanges()

    // Assert
    const asideElementVisibleAfter = await asideElement.isVisible();
    expect(asideElementVisibleAfter).toBe(!asideElementVisibleBefore);
  });
});
