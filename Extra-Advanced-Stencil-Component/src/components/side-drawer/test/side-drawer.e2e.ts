import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('side-drawer', () => {
  let page: E2EPage,
      sideDrawer: E2EElement,
      aside: E2EElement;
  beforeEach(async () => {
    // Arrange
    page = await newE2EPage();
    await page.setContent(`
      <side-drawer>
        <nav class="side-nav">
          <ul>
            <li>A Link</li>
            <li>Another Link</li>
            <li>A Third Link</li>
          </ul>
        </nav>
      </side-drawer>
    `);

    sideDrawer = await page.find('side-drawer');
    aside = await page.find('side-drawer >>> aside');
  })
  it('should not be open by default', async() => {
    // Assert
    const sideDrawerVisible = await aside.isVisible();
    expect(sideDrawerVisible).toBe(false);
  });
  it('should open when the openDrawer method is triggered externally', async () => {
    // Act
    await sideDrawer.callMethod('openDrawer');
    await page.waitForChanges();

    // Assert
    const sideDrawerVisible = await aside.isVisible();
    expect(sideDrawerVisible).toBe(true);
  });
  it('should close when the close button is clicked', async () => {
    // Arrange
    await page.$eval('side-drawer', (element: any) => {
      element.opened = true;
    });
    await page.waitForChanges();
    const sideDrawerVisibleBefore = await aside.isVisible();

    // Act
    await page.$eval('side-drawer', (sideDrawerElement: any) => {
      const closeButton = sideDrawerElement.shadowRoot.querySelector('#close-button');
      closeButton.click();
    });
    await page.waitForChanges();
    
    // Assert
    const sideDrawerVisibleAfter = await aside.isVisible();
    expect(sideDrawerVisibleAfter).toBe(!sideDrawerVisibleBefore);
  });
  it('should closed when the backdrop is clicked', async() => {
    // Arrange
    await page.$eval('side-drawer', (element: any) => {
      element.opened = true;
    });
    await page.waitForChanges();
    const sideDrawerVisibleBefore = await aside.isVisible();

    // Act
    await page.$eval('side-drawer', (sideDrawerElement: any) => {
      const backdrop = sideDrawerElement.shadowRoot.querySelector('.backdrop');
      backdrop.click();
    });
    await page.waitForChanges();
    
    // Assert
    const sideDrawerVisibleAfter = await aside.isVisible();
    expect(sideDrawerVisibleAfter).toBe(!sideDrawerVisibleBefore);
  });
  it('should open the contact info tab when the contact button is clicked on an open side drawer', async () => {
    // Arrange
    await page.$eval('side-drawer', (element: any) => {
      element.opened = true;
    });
    await page.waitForChanges();

    // Act
    await page.$eval('side-drawer', (sideDrawerElement: any) => {
      const contactInfoButton = sideDrawerElement.shadowRoot.querySelector('#contact');
      contactInfoButton.click();
    });

    // Assert
    await page.waitForChanges();
    const contactInfoElement = await page.find('side-drawer >>> #contact-information');
    expect(contactInfoElement).not.toBeNull();
  });
});