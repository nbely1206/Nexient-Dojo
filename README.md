# Nexient-Dojo
Repository for Nexient DOJO Completed Stencil Project and Extra Content:

## Overview:

### Completed-Stencil-Component

This holds the stencil project that was worked on collaboratively in the Coding DOJO Session on 11/2/2022, where a simple side drawer component was developed while practicing Test-Driven Development techniques.

### Extra-Advanced-Stencil-Component

This holds the reference stencil project that was created as a reference for the DOJO session. It includes all of the content develop in the session, in addition to a backdrop and tab functionality on the side drawer component.

### Extra-Web-Component-Example

This holds the vanilla javascript web component example that was briefly shown in the Coding DOJO Session on 11/2/2022.

### Useful Links

- Web Components: https://www.webcomponents.org/introduction
- Stencil: https://stenciljs.com/docs/introduction
- TypeScript:  https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- JSX: https://reactjs.org/docs/introducing-jsx.html
- Jest: https://jestjs.io/docs/getting-started
	- Jest NPM Terminal Commands Rule: https://jestjs.io/docs/cli#using-with-npm-scripts
- Puppeteer: https://pptr.dev/

## Notes

Some potentially useful notes used for the presentation portion of the Coding DOJO Session:

### What are Web Components?

Web components are a collection of technologies:
- Custom Element - Lets you define your own HTML Elements/Tags
- HTML Templates - Let you write HTML Template code that you can add to your custom elements dynamically, letting you actively render HTML in the DOM.
- Shadow DOM - Manages a separate DOM node tree for your HTML elements that encapsulates markup as well as styling (allows for scoping of styles)

Web components are used because:
- Can be easily imported and and used ubiquitously with any JavaScript library or framework that works with HTML
- They are customizable
- They are reusable
- The contents can be encapsulated within your custom element

Encapsulation via the Shadow DOM is especially important because in a sense, you want your custom elements to be bulletproof in that styling and other parts of the external code where someone may be importing and using your custom element should absolutely not bleed into your custom element and alter it unintentionally.

### StencilJs
	
#### What Stenciljs is not:

StencilJs is not a stand-alone framework like React, Angular, or Vue. It is more accurate to say that Stenciljs is a framework-esque tool that allows developers to more easily and write clean and scalable code for framework-agnostic web components. 

It does this by utilizing a lot of the same traits as major front end frameworks like React and Angular, and then proceeds to have the stencil component code compiled to optimized vanilla JavaScript Web Components.

#### What else is it good for?

- Loading component code lazily (i.e. source code gets only pulled into the page if it's really needed => This reduces the overall bundle size)
- Loading required polyfills automatically for browsers that need it (IE11) (Polyfill are pieces of code used to provide modern functionality for old browsers)
- Re-rendering the web (component) DOM efficiently (i.e. the DOM gets updated with as minimal impact as possible, to reduce the amount of work JS and the browser have to do)

#### Technologies Used:

- Web Components
- TypeScript - Extends JavaScript by adding data types, classes, interfaces, and other object-oriented features with type-checking. It is a typed superset of Javascript that compiles to plain Javascript.
- JSX/TSX - From React - A syntax extension of Javascript that allows writing Javacript that looks similar to HTML. It violates a separation of concerns between your javscript and HTML markup in favor of having the power to integrate or manipulate your template with javascript expressions.
- Jest - Standard Javascript Testing Framework and Test Runner.
- Puppeteer - Browser Automation API like playwright or cypress that runs and controls a headless version of Chrome or Chromium.

#### Stencil Basics
A decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter, and make it so that some sort of function is evaluated whenever the related class or class member is instantiated or changed.
A decorator is usually denoted in the format: `@DecoratorName()`. Options can also be passed in as an object to the parentheses.
	  
- @Component() - This is used to denote a class as a stencil component, and provides a lot of behind-the-scenes wiring up of your component.
    Options:
    - tag: lets you define the custom HTML Element tag name for your component as a string. Must be at least two hyphenated phrases. Ex: `side-drawer`
    - styleUrl: lets you set the path to the stylesheet you'd like loaded with your component as a string
    - styleUrls: lets you set the paths to multiple stylesheets that you'd like loaded with your component as an array of string
    - shadow: setting to true attaches a shadowDOM to your stencil component for encapsulation/style scoping.
- @Prop() - This is used to denote custom attributes/properties that will be publicly exposed on your custom HTML Element.
    Options:
	- attribute: lets you define the attribute name used in your custom element's tag, by default, Stencil figures this out for you. If using camelcase or pascal case, it converts to kebab-case, all lower case with hyphens between words
	- mutable: lets you change the Prop internally, by default false
	- reflect: updates to the Prop are reflected in the DOM tree, by default false
- @State() - This is used to denote internal class members that should trigger a re-render upon being initialized or updated
- @Method() - This is used to denote any class methods that you wish to be exposed on the public API. These always need to be asynchronous. So you want either classify them as async, or you want them to return a promise

- Render() - A function used in a stencil component that should return TSX (the typescript version of JSX) inclusive of the HTML Template that you'd like rendered with your component. Will automatically be re-run whenever @Prop() or @State() variables are updated. 

#### Two Testing Types in Stencil:

- Unit Tests: These should focus on testing a component's methods in isolation. These use Jest as a backbone, wrapped by Stencil as Spec Tests, and are ran within a node environment.
- End-to-end tests: These should focus on how the components are rendered in the DOM and how the individual components work together if you have multiple web components with some being dependent on one another. These also use Jest as a backbone for the test framework and runner, and additonally use Puppeteer to run the tests in an headless headless browser instead of a node environment.


#### Useful Commands

Generating a Stencil Project via Terminal:
`npm init stencil`

Install new Stencil Project via Terminal after navigating to it:
`npm install`

Generating a New Component in a Stencil Project via Terminal:
`npm run generate`

Running Tests via Terminal:
`npm run test`

Running Tests with Options via Terminal:
`npm run test -- --coverage`

If for some reason, you trouble generating coverage reports that capture every test file, try with the following argument as well:
`npm run test -- --coverage --no-cache`