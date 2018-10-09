[![Build status](https://build.appcenter.ms/v0.1/apps/761af6a1-4a1f-4b25-acd9-1148ca6e3497/branches/master/badge)](https://appcenter.ms)

# MeatJournal

Food journalling application for those following the **Carnivore Diet** and only eat meat.

## Tech Stack

This project is build from the [bower boilerplate from Infinite Red](https://github.com/infinitered/ignite-ir-boilerplate-bowser) and uses the following React Native stack:

* React Native
* React Navigation
* MobX State Tree
* TypeScript
* And more!

## Design Files

The design files can all be found on [Figma](https://www.figma.com/file/FuctAJdJ15WcqL0vw7wdYM5U/Meat-Journal?node-id=0%3A1) along with a [live prototype](https://www.figma.com/proto/FuctAJdJ15WcqL0vw7wdYM5U/Meat-Journal?node-id=1%3A3&scaling=scale-down) of the application.

## Creating Screens & Components Using [Ignite CLI](https://github.com/infinitered/ignite)

To easily create new components or screens, install the Ignite CLI (`yarn global add ignite-cli`) and then run one of the following commands:

```
ignite generate screen MyScreenName
ignite generate component MyComponentName
```

For more usage of the Ignite CLI, look at [their documentation](https://github.com/infinitered/ignite/tree/master/docs).

## Debugging

### JS Debugging

This project uses the [React Native Debugger](https://github.com/jhen0409/react-native-debugger) which should be installed on your machine in order for it to be run automatically when selecting `Debug JS Remotely` from the developer menu.

This project is also configured to use [Reactotron](https://github.com/infinitered/reactotron) to debug JavaScript. If you have Reactotron installed, it will open automatically when running `yarn start`.

### Component Hiearchy Debugging

It's also recommended to download the [standalone React devtools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools) to be able to better debug the component hierarchy when selecting `Toggle Inspector` from the developer menu. Unlike the `React Native Debugger`, the `React devtools` needs to be launched from the command line before being able to use it:

```
react-devtools
```

If you're not in the simulator but rather using a physical device, you will need to run the following command:

```
adb reverse tcp:8097 tcp:8097
```
