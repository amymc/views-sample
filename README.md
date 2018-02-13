To create the react-dom app:

* Run `npm install --global create-react-app` in your project directory.
* Then run `create-react-app views-sample-web` to create the react-dom app.

To create the react-native app:

* Run `npm install --global create-react-native-app` in your project directory.
* Then run `create-react-native-app views-sample-native` to create the react-native app.

To start using Views on your project:

* Run `npm install --global @viewstools/use` to install Views.
* Then `cd views-sample-dom` and then run `use-views` to get your dom project setup as a Views project.
* Then `cd views-sample-native` and then run `use-views` to get your natve project setup as a Views project.

Let's make some components.

* In the `src/Main` directory of your web project, add the following button with a label to `App.view`:

```
Button Horizontal
onClick <
height 20
width 150
backgroundColor red
color white
justifyContent center
Label Text
text hey click me
width 100%
textAlign center
```

* Run `npm start` to morph your view file and start the server. You should now have a React component called `App.view.js`. and you should be able to see it on `http://localhost:3000/`.

Let's import a 3rd party component

* Run `npm install react-spinners --save`.
* Create a file called `Spinner.js` with the following

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

We tell Views that it's a 3rd party component by adding the `@view` pragma at the top of the file.

* Import the Spinner into your app by putting the following in your `App.view`.

```
Spinner
onWhen <isLoading
size 10
type ClipLoader
color white
width 100%
```

* You won't be able to see it yet because we have set it to only display when `onLoading` is true with this line `onWhen <isLoading`.
* So let's add some logic to show and hide the spinner.
* Update your `App.view.logic.js` to look like this:

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

we are passing props, state and the onClick function to our `App.view` file.

* In your `App.view` file update your button label to this:

```
Label Text
onWhen <!isLoading
text hey click me
width 100%
textAlign center
```

Now the text will only display if `isLoading` is false.
So when you click on your button it will toggle between showing the label and the spinner.

Let's import a component from Orchid

* Symlink your local instance of Orchid to your Views project.
  * Run `npm link` in the root of Orchid
  * Run `npm link "orchid"` in the root of your views dom project
* Create a file called `OrchidButton.js` with the following:

```
@view
import 'orchid/web/library/static/css/orchid.css'
import * as Orchid from 'orchid/web/library/orchid-library.min.js'
import React from 'react'

export default Orchid.Button
```

* Then in your `App.view` you can use it like this:

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

Let's add some more logic to make that work. Update your `App.view.logic.js` to look like this:

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

Your final `App.view` should look like this:

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
color white
justifyContent center
Label Text
onWhen <!isLoading
text hey click me
width 100%
textAlign center

Spinner
onWhen <isLoading
size 10
type ClipLoader
color white
width 100%


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
