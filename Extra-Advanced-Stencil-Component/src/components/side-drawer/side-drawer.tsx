import { Component, Method, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;

  @Prop({ reflect: true, mutable: true }) opened: boolean = false;
  @Prop({ reflect: true }) menuTitle: string = 'Menu';

  @Method()
  async openDrawer() {
    this.opened = true;
  }

  @Method()
  async closeDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
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
      );
    }

    return [
      <div class="backdrop" onClick={this.closeDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.menuTitle}</h1>
          <button id="close-button" onClick={this.closeDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
        <button
          id="nav"
          class={!this.showContactInfo ? 'active' : ''}
          onClick={this.onContentChange.bind(this, 'nav')}
        >
          Navigation
        </button>
        <button
          id="contact"
          class={this.showContactInfo ? 'active' : ''}
          onClick={this.onContentChange.bind(this, 'contact')}
        >
          Contact
        </button>
      </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }
}
