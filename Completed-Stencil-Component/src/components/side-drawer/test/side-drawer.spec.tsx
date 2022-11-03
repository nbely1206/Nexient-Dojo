import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SideDrawer } from '../side-drawer';

describe('side-drawer', () => {
  let page: SpecPage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer menu-title="Test Menu"></side-drawer>`,
    });
  })
  it('renders', async () => {
    expect(page.root).toEqualHtml(`
      <side-drawer menu-title="Test Menu">
        <mock:shadow-root>
          <aside>
            <header>
              <h1>Test Menu</h1>
              <button id="close-button">X</button>
            </header>
            <main>
              <slot></slot>
            </main>
          </aside>
        </mock:shadow-root>
      </side-drawer>
    `);
  });
  describe('open/close state', () => {
    it('should change the state to opened when we call openDrawer', async () => {
      // Arrange
      const openedInitialState = page.root.opened;

      // Act
      await page.root.toggleDrawer();
      await page.waitForChanges();

      // Assert
      const openedFinalState = page.root.opened;
      expect(openedFinalState).toBe(!openedInitialState);
    });
  })
});
