# MeatJournal

Food journalling application for those following the **Carnivore Diet** and only eat meat.

## Design Files

The design files can all be found on [Figma](https://www.figma.com/file/FuctAJdJ15WcqL0vw7wdYM5U/Meat-Journal?node-id=0%3A1) along with a [live prototype](https://www.figma.com/proto/FuctAJdJ15WcqL0vw7wdYM5U/Meat-Journal?node-id=1%3A3&scaling=scale-down) of the application.

## Creating Screens & Components Using [Ignite CLI](https://github.com/infinitered/ignite)

To easily create new components or screens, install the Ignite CLI (`yarn global add ignite-cli`) and then run one of the following commands:

```
ignite generate screen MyScreenName
ignite generate component MyComponentName
```

For more usage of the Ignite CLI, look at [their documentation](https://github.com/infinitered/ignite/tree/master/docs).

## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

* React Native
* React Navigation
* MobX State Tree
* TypeScript
* And more!

## Quick Start

The Ignite Bowser boilerplate project's structure will look similar to this:

```
ignite-project
├── src
│   ├── app
│   ├── i18n
│   ├── lib
│   ├── models
│   ├── navigation
│   ├── services
│   ├── theme
│   ├── views
├── storybook
│   ├── views
│   ├── index.ts
│   ├── storybook-registry.ts
│   ├── storybook.ts
├── test
│   ├── **snapshots**
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
│   ├── storyshots.test.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
└── package.json
```

The directory structure uses a ["feature first, function second"](https://alligator.io/react/index-js-public-interfaces/) approach to organization. Files are grouped by the feature they are supporting rather than the type of file.

For example: A custom `Button` component would have the main component file, and test, and any assets or helper files all grouped together in one folder.

This is a departure from the previous boilerplate, which grouped files by type (components together, styles together, tests together, images together, etc.). One feature of this new approach is the use of index files which export specific functions from files in the directory to create a public interface for each "thing", or "feature. You'll see that pattern quite a bit in this boilerplate.

## ./src directory

The inside of the src directory looks similar to the following:

```
src
├── app
│── i18n
├── lib
├── models
├── navigation
├── services
├── theme
├── views
```

**app**
This is where a lot of your app's initialization takes place. Here you'll find:

* root-component.tsx - This is the root component of your app that will render your navigators and other views.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**lib**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigation**
This is where your `react-navigation` navigators will live.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**views**
This is where all of your components will live. Both dumb components and screen components will be located here. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components.

You may choose to futher break down this directory by organizing your components into "domains", which represent cohesive areas of your application. For example, a "user" domain could hold all components and screens related to managing a user.

**storybook**
This is where your stories will be registered and where the Storybook configs will live

**test**
This directory will hold your Jest configs and mocks, as well as your [storyshots](https://github.com/storybooks/storybook/tree/master/addons/storyshots) test file. This is a file that contains the snapshots of all your component storybooks.

**ignite**
The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find generators, plugins and examples to help you get started with React Native.

## Debugging

### JS Debugging

This project uses the [React Native Debugger](https://github.com/jhen0409/react-native-debugger) which should be installed on your machine in order for it to be run automatically when selecting `Debug JS Remotely` from the developer menu.

This project is also configured to use [Reactotron](https://github.com/infinitered/reactotron) to debug JavaScript. If you have Reactotron installed, it will open automatically when running `yarn start`.

### Component Hiearchy Debugging

It's also recommended to download the [standalone React devtools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) to be able to better debug the component hierarchy when selected `Toggle Inspector` from the developer menu. Unlike the `React Native Debugger`, the `React devtools` needs to be launched from the command line before being able to use it:

```
react-devtools
```

If you're not in the simulator but rather using a physical device, you will need to run the following command:

```
adb reverse tcp:8097 tcp:8097
```
