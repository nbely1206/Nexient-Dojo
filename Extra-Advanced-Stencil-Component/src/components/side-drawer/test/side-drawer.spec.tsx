import { AnyHTMLElement } from '@stencil/core/internal';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { SideDrawer } from '../side-drawer';

describe('side-drawer', () => {
  let page: SpecPage,
      sideDrawer: AnyHTMLElement;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [SideDrawer],
      html: `<side-drawer></side-drawer>`,
    });
    sideDrawer = page.root;
  })
  describe('rendering', () => {
    it('should render in the default state', () => {
      expect(page.root).toEqualHtml(`
        <side-drawer menu-title="Menu">
          <mock:shadow-root>
            <div class="backdrop"></div>
            <aside>
              <header>
                <h1>Menu</h1>
                <button id="close-button">X</button>
              </header>
              <section id="tabs">
                <button id="nav" class='active'>Navigation</button>
                <button id="contact">Contact</button>
              </section>
              <main> 
                <slot />
              </main>
            </aside>
          </mock:shadow-root>
        </side-drawer>
      `);
    });
    it('should render with an attribute-defined menu title', async () => {
      page = await newSpecPage({
        components: [SideDrawer],
        html: `<side-drawer menu-title="Main Menu"></side-drawer>`,
      });
      expect(page.root).toEqualHtml(`
        <side-drawer menu-title="Main Menu">
          <mock:shadow-root>
            <div class="backdrop"></div>
            <aside>
              <header>
                <h1>Main Menu</h1>
                <button id="close-button">X</button>
              </header>
              <section id="tabs">
                <button id="nav" class='active'>Navigation</button>
                <button id="contact">Contact</button>
              </section>
              <main> 
                <slot />
              </main>
            </aside>
          </mock:shadow-root>
        </side-drawer>
      `);
    });
    it('should render external HTML inserted via the slot in the component, but outside the shadow-root', async () => {
      page = await newSpecPage({
        components: [SideDrawer],
        html: `
          <side-drawer>
            <a href="/">A Link</a>
          </side-drawer>`,
      });
      expect(page.root).toEqualHtml(`
        <side-drawer menu-title="Menu">
          <mock:shadow-root>
            <div class="backdrop"></div>
            <aside>
              <header>
                <h1>Menu</h1>
                <button id="close-button">X</button>
              </header>
              <section id="tabs">
                <button id="nav" class='active'>Navigation</button>
                <button id="contact">Contact</button>
              </section>
              <main> 
                <slot />
              </main>
            </aside>
          </mock:shadow-root>
          <a href="/">A Link</a>
        </side-drawer>
      `);
    });
  })
  describe('open/close state', () => {
    it('should not be in an opened state by default', () => {
      expect(page.root.opened).toBeFalsy();
    });
    it('should be opened when the openDrawer() method is called', async () => {
      await page.root.openDrawer();
      await page.waitForChanges();
      expect(page.root.opened).toBe(true);
    });
    it('should not be in an opened state after the closeDrawer() method is called', async () => {
      await page.root.openDrawer();
      await page.waitForChanges();
      expect(page.root.opened).toBe(true);
      await page.root.closeDrawer();
      await page.waitForChanges();
      expect(page.root.opened).toBe(false);
    });
  });
  describe('tab state', () => {
    it('should by default be on the Navigation Tab', async () => {
      const mainElement = await sideDrawer.shadowRoot.querySelector('main');
      expect(mainElement).toEqualHtml(`
        <main>
          <slot />
        </main>
      `);
    });
    it('should switch to the Contact Info Tab when the contact info button is clicked', async () => {
      const mainElement = await sideDrawer.shadowRoot.querySelector('main');
      const contactButton = await sideDrawer.shadowRoot.querySelector('#contact');

      await contactButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();

      expect(mainElement).toEqualHtml(`
        <main>
          <div id="contact-information">
            <h2>Contact Information</h2>
            <p>You can reach us via phone or email.</p>
            <ul>
              <li>Phone: 49802384032</li>
              <li>
                E-Mail:
                <a href="mailto:something@something.com">
                  something@something.com
                </a>
              </li>
            </ul>
          </div>
        </main>
      `);
    });
    it('should switch back to the Navigation Tab when the navigation button is clicked', async () => {
      const mainElement = await sideDrawer.shadowRoot.querySelector('main');
      const contactButton = await sideDrawer.shadowRoot.querySelector('#contact');
      const navButton = await sideDrawer.shadowRoot.querySelector('#nav');

      await contactButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      await navButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();

      expect(mainElement).toEqualHtml(`
        <main>
          <slot />
        </main>
      `);
    });
  });
});
