# Tutorial

## Plunker

We are going to be using a REPL (read-evaluate-print-loop) tool called Plunker for this workshop. Plunker is great because it helps us run code in a known environment and under known conditions. This helps get around the issue of different different versions of tools, OSes and compilers and helps us get started quicker.

The starting point for this workshop is located [here](https://plnkr.co/edit/jy8rqmDICZnCJNOY9fnI?p=info).

## Getting Started

Follow the link above to the starting checkpoint plunk. Once there, click the fork button to save a local copy so you can make edits to it.

That's it, you've started writing code for this workshop, there aren't installs or downloads to worry about.

## Creating a heading component

We're going to start by adding a heading to our workshop page. For that, we're going to create a stateless React component called `Heading` and we're going to tell ReactDOM to render it. Lets define the stateless component first and then review the code.

```jsx
function Heading(props) {
    return (<h1>{props.text}</h1>);
}
```

The code here is simple. We declare a function called `Heading` which takes one parameter called `props`. Any React component declared as a Function (as we'll see later, we can also write React components as objects) takes that one parameter. The component should then return what we want React to render on the screen given the `props` that it was given. The `props` object contains all the attributes passed to that component when it's used in the code. As we can see here, we're using the `text` property on the `props` and surrounding it in `<h1>` tags. Here's how we use it,

```jsx
ReactDOM.render(
    <Heading text="Ohio State Workshop" />
    document.getElementById('react-root')
);
```

As you can see we're using the `Heading` component with the `text` attribute right in the `render` call. Using the `text` attribute puts a key called `text` with the value was assigned to `text`. Telling ReactDOM to render the `<Heading>` component replaces the React component with the HTML from the `Heading` stateless component.

## Creating the skeleton

The next step is to create the high level stateful component. Usually, React applications that use stateless components utilize something like Redux to manage state but to keep things simple, we'll just create a top level `Application` component which will handle all the state of the app. We will also start talking to the server that we are going to get data from in this step too.

```jsx
const AppComponent = React.createClass({
    getInitialState: function() {
        return {
            status: 'unknown'
        };
    },
    componentWillMount: function() {
        const self = this;

        particleService.getStatus().then(status => {
            self.setState({
                status: status.apiStatus
            });
        });
    },
    render: function() {
        return (
            <div>
                <Heading text="Ohio State Workshop" />
                <Status text={this.state.status} />
            </div>
        );
    }
})
```

There is a lot of code here so lets break it down and digest it bit by bit. This is the first time that we're using the stateful way of declaring React components. Passing an object into `React.createClass()` will create a React component for you which you can then assign to a variable and use just like the stateless component we say earlier. There are some required properties on the object like a function called `render` and a function called `getInitialState`. The `render` function tells React what to put in place of the component when rendering the page and the `getInitialState` tells React what the starting state of the component should be.

There are a couple of other members on the React component that you get for free. There is a function called `.setState()` which will let you modify the state of your component and a property called `.props` which you can use to access any data passed in through the attributes when the component is created. This is just like the `props` argument that we have seen in the past with stateless functions.

## Creating a service

Part of the code snippet above is `particleService`. It is a helper class that we have written to separate the controller code from the view code. There are three things of note here.

1. The `particleService` helper file is based on a popular Javascript framework called jQuery. jQuery adds a whole lot of helper methods to an object called `$` which is available everywhere. So we use `$.ajax()` which lets us query our API for data. AJAX stands for Asynchronous JavaScript And XML. But we wrap up all of the `$.ajax()` calls so that it's easy for us to write the view layer code.

2. The next question that you might ask is how do we go about getting access to the functions included in `particleService`? This is where we'll talk about scope in JavaScript. Just writing functions in a file is not going to automatically "export" them to the world. We have to attach them to a known reference. That reference in the browser is called the `window` object. The `window` object is ever present in JavaScript written in the browser.

    ```javascript
    // filename: a.js
    // loaded first
    window.foo = 'bar';

    // filename: b.js
    // loaded second
    console.log(foo); // prints bar
    ```
As you can see from the example, we didn't even have to specify what object `foo` resides on because it resides on the `window` object. Generally speaking, JavaScript developers recommend against putting data on the `window` object (commonly referred to as "polluting the global scope") since it's a low level object and anyone from any other part of the app can change what's on `window` which can lead to confusion and bugs. But services like `particleService` should be put on the `window` object since we can then access them from anywhere. We're almost able to access `particleService` from our React component. There is one part missing.

3. We need to tell the JavaScript engine to load the file. This is done through the `<script>` HTML tag. Using a `<script>` tag with the `src` attribute, I can tell the JavaScript engine in the browser to load up a JavaScript file. `<script>` tags are usually put in the main HTML file for the app since it's the entry point of the application or web page. 
