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
