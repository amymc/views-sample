To create the react-dom app:

* Run `npm install --global create-react-app` in your project directory.
* Then run `create-react-app sample-dom` to create the react-dom app.

To create the react-native app:

* Run `npm install --global create-react-native-app` in your project directory.
* Then run `create-react-native-app sample-native` to create the react-native app.

To start using Views on your project:

* Run `npm install --global @viewstools/use` to install Views.
* Then `cd sample-dom` and then run `use-views` to get your dom project setup as a Views project.
* Then `cd sample-native` and then run `use-views` to get your natve project setup as a Views project.

Let's make some components.

* In the `src/Main` directory of your web project, add a new line to the end of `App.view` and copy
  the following code for a button with a label after it:

```
Button Horizontal
onClick <
height 20
width 150
backgroundColor red
justifyContent center
Label Text
color white
text hey click me
```

Your `App.view` will look like:

```
App Vertical
alignItems center
flex 1
justifyContent center
Text
fontSize 18
text < Hello Views Tools!

Button Horizontal
onClick <
height 20
width 150
backgroundColor red
justifyContent center
Label Text
color white
text hey click me
```

* Run `npm start` to morph your view file and start the server. You should now have a React
  component called `src/Main/App.view.js`. and you should be able to see it on `http://localhost:3000/`.

We want our button to do something, so how about we say that when we click it,
we get a `Loading` message. Let's add a scope to the `Text` of the button to do
that. Replace:

```
Label Text
color white
text hey click me
```

for:

```
Label Text
color white
text hey click me
when <isLoading
text Loading
```

* So let's add some logic to show a loading state when we click that button.
* Update your `src/Main/App.view.logic.js` to look like this:

```
import React from 'react'
import App from './App.view.js'

export default class AppLogic extends React.Component {
  state = {
    isLoading: false,
  }

  onClick = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render() {
    return <App {...this.props} {...this.state} onClick={this.onClick} />
  }
}
```

Here we're just creating an `onClick` function which toggles the `isLoading` state whenever its called.
And in this line

```
return <App {...this.props} {...this.state} onClick={this.onClick}
```

we are passing `props`, `state` and the `onClick` function to our `App.view` file.

That `Loading` text isn't all that fun, isn't it? Let's put a little spinner to
spice things up :|. (it probably sounds more fun than saying let's import a 3rd party
component, doesn't it?)

* Run `npm install react-spinners --save`.
* Create a file called `src/Spinner.js` with the following

```
// @view
import * as Spinners from 'react-spinners'
import React from 'react'

const Spinner = ({ type, ...props }) => {
  const Type = Spinners[type]
  return <Type loading={true} {...props} />
}
Spinner.defaultProps = {
  type: 'ClipLoader',
}
export default Spinner
```

We tell Views that it's a 3rd party component by adding the `// @view` pragma at the top of the file.

* Import the Spinner into your app by putting the following inside your `Button` in your `src/Main/App.view`.

```
Spinner
onWhen <isLoading
size 10
type ClipLoader
color white
```

* You won't be able to see it yet because we have set it to only display when `onLoading` is true with this line `onWhen <isLoading`.

- In your `src/Main/App.view` file update your button label to this:

```
Label Text
onWhen <!isLoading
text hey click me
```

Now the text will only display if `isLoading` is `false`.
So when you click on your button it will toggle between showing the label and the spinner.

Let's import a component from Orchid

* Symlink your local instance of Orchid to your Views project.
  * Run `npm link` in the root of Orchid
  * Run `npm link "orchid"` in the root of your views dom project
* Create a file called `src/OrchidButton.js` with the following:

```
// @view
import 'orchid/web/library/static/css/orchid.css'
import { Button } from 'orchid/web/library/orchid-library.min.js'

export default Button
```

* Then in your `src/Main/App.view` you can use it like this:

```
OrchidButton
onClick <onOrchidClick
Text
text Hey!
when <isOrchidLoading
text Loading
```

If you want to add the spinner inside the Orchid button, similar to our custom button earlier, you can do this:

```
OrchidButton
onClick <onOrchidClick
Text
text Hey!
when <isOrchidLoading
text Loading

Spinner
onWhen <isOrchidLoading
size 10
type ClipLoader
color white
width 100%
```

Let's add some more logic to make that work. Update your `src/Main/App.view.logic.js` to look like this:

```
import React from 'react'
import App from './App.view.js'

export default class AppLogic extends React.Component {
  state = {
    isLoading: false,
    isOrchidLoading: false,
  }

  onClick = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  onOrchidClick = () => {
    this.setState({ isOrchidLoading: !this.state.isOrchidLoading })
  }

  render() {
    return (
      <App
        {...this.props}
        {...this.state}
        onClick={this.onClick}
        onOrchidClick={this.onOrchidClick}
      />
    )
  }
}
```

We've just added an Orchid loading state, and an Orchid click event and we're passing those to the view like we did with the previous button.

Your final `src/Main/App.view` should look like this:

```
App Vertical
alignItems center
flex 1
justifyContent center
Text
fontSize 18
text < Hello Views Tools!

Button Horizontal
onClick <
height 20
width 150
backgroundColor red
justifyContent center
Label Text
onWhen <!isLoading
color white
text hey click me

Spinner
onWhen <isLoading
size 10
type ClipLoader
color white


OrchidButton
onClick <onOrchidClick
Text
text Hey!
when <isOrchidLoading
text Loading

Spinner
onWhen <isOrchidLoading
size 10
type ClipLoader
color white
```

_React Native_

To run your React Native app, `cd sample-native` and run `npm start`. Then, open
a new terminal and run `npm run ios` to open the iOS simulator or scan the QR
code you get on the terminal in your [Expo app](https://expo.io) on your phone.


Replace `src/Main/App.view` for:
```
App Vertical
alignItems center
flex 1
justifyContent center
Text
fontSize 18
text < Hello Views Tools!

Button Horizontal
onClick <
height 20
width 150
backgroundColor red
justifyContent center
Label Text
color white
text hey click me
when <isLoading
text Loading
```

Replace `src/Main/App.view.logic.js` for:
```
import { AppLoading, Font } from 'expo';
import { Animated } from 'react-native';
import fonts from '../fonts.js';
import React from 'react';
import App from './App.view.js';

export default class AppLogic extends React.Component {
  state = {
    isLoading: false,
    isReady: false,
  };

  onClick = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <App {...this.props} {...this.state} onClick={this.onClick} />;
  }

  _cacheResourcesAsync() {
    return Font.loadAsync(fonts);
  }
}
```

Prepare to be dazzled by a red button :|.
