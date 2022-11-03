import { Component, h, Prop, Method } from '@stencil/core';

@Component({
  tag: 'side-drawer',
  styleUrl: 'side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @Prop({ reflect: true }) menuTitle: string = "Menu";
  @Prop({ reflect: true, mutable: true }) opened: boolean = false;

  @Method()
  async toggleDrawer() {
    this.opened = !this.opened;
  } 

  render() {
    const onCloseButtonClick = this.toggleDrawer.bind(this)

    return (
      <aside>
        <header>
          <h1>{this.menuTitle}</h1>
          <button id="close-button" onClick={onCloseButtonClick}>X</button>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    );
  }

}
