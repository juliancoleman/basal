# Basal

![jeremy-bezanger-basil-unsplash.jpg](.github/images/jeremy-bezanger-basil-unsplash.jpg)

A Primitive React UI component library aimed to solve three problems:

1. CSS is unpredictable and the fixes for these are often unimplemented in a standard way.
2. The predictable stuff should just never be done more than once.
3. The component library you currently use doesn't offer a way to make your own components, or it's not convenient enough

## What this is

An extensible, themeable React UI component library that's designed to let you focus on solving UI problems with clear business advantage.

## What this isn't

A pharmacy for you to buy Aspirin for your headaches, nor a kitchen for you to find a bowl for your tears.

## Why?

Let's imagine your boss comes to you and says, _"We need a component library."_ You sit down and consider what kinds of components you might want to build, you spend a lot of time in Figma, you come up with a design language and theme for your organization. You wake up at 3AM realizing you are the latest developer to recreate the wheel (again). But you go to work the next morning and you start developing the component library for React and you write tests and deploy Storybook and make sure that your `browserslist` has been tuned to perfection. Everything is working well... Well..?

Months go by and your boss decides they want to add another color palette to the existing available colors. You go back and add CSS variables, SCSS variables, and then you re-export each theme color to be available in your JSX. You then have to make sure that every component now has a variant for such a color.

A few months after this, your friend comes to you and says, _"Can you help me debug this issue? I can't figure out why a `<div>` nested under a `<td>` isn't taking up the full height of the `<td>`."_ You solve your friend's problem only to realize that this same problem has been solved about a thousand million times and not one component library implements such a fix. So your friend implements the fix in their LESS file and forgets about it a day later.

Another friend comes to you and asks why their Dialog is centered to the window instead of the Dialog's parent, just to find their current component library was aggressively [Portaling]() and setting the CSS position manually, and you solve that problem, too. You spend the next several years solving all of these problems to make the internet a better user experience.

Fast forward those several more years, having solved about a hundred of these CSS problems, and you're the CTO of a new and upcoming tech company. Your business partners, who are also seasoned Full-Stack engineers are aware of your expertise in making component libraries, and so they ask you to make one. At this point, you can go back to the beginning of the [Why](#why) section and start reading.

## Installation

You can install Basal as a whole with NPM

```
# not available during current development. Please install individual components directly
npm i basal
```

Or you can install the individual components directly, too. That's cool.

```
npm i @basal/button
```

## Cloning Locally

You can clone with your favorite Git tool. Once cloned, run the following:

```
npm run lerna bootstrap
```

## Testing

### Unit/Integration

You can test each component in the library by running the following

```
npm run lerna run test
```

Or you can test each individual component by `cd`ing into `packages/<component>` and running the following:

```
npm run test
```

Unit/integration tests are always located at `packages/package-name/src/my-component.spec.tsx`

### E2E

Running this test requires two terminal windows/tabs. You can launch an E2E (click test) with the following in one terminal

```
npm run storybook
```

And running the following in the other.

```
npm run cypress
```

If you want to also run Cypress E2E tests in your own app that uses Basal, copy the `cypress` directory into your project, run `npm i -D cypress`, and add your own tests to `cypress/integration`. You'll need to remove the other tests that you copied over, of course, but you can use them as a reference while developing your own tests.

When contributing to Basal, you can add more tests in `cypress/integration` following the same pattern as other files.

Note: If Cypress isn't already installed on your system, it will attempt to be installed automatically at this time. You can [read their docs]() if you have any other troubles running Cypress.

## FAQ

### Where is all the CSS?

![KnowYourMeme Roll Safe](https://i.kym-cdn.com/entries/icons/original/000/022/138/highresrollsafe.jpg)

### What's the minimum React version I can use?

React 16.8, which introduced [Hooks](). However, internally the latest version of React is always used.

### Why use Tailwind under the hood?

I don't believe developers should waste time writing CSS. A long time ago, this would otherwise be okay. But after 2020, writing CSS just stopped making sense. Set your organization's color palette and make your small visual changes with Tailwind classes and get to focusing on solving real business problems.
