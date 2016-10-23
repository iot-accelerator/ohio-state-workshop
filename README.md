# ohio-state-workshop
Particle workshop at Ohio State University

## Introduction

Once we are done with this workshop, we are going to be able to read data from sensors connected to Particle Photons in our web browser. We are going to start with an empty web app using the React view library and then add server status, a data reading service and finally a table that displays sensor values.

## Key Concepts

### Asynchronous operations - `aPromise.then()`

The standard way of performing asynchronous operations in Javascript is something called Promises. An operation that uses promises is basically saying that the operation has started and at some point in the future, I will give you some result. Operations like such "return promises" which will then resolve into some data that you care about. You use the `then()` function to get access to the value and the `catch()` function to get access to any errors that might have occurred.

In the example below, assume that `getProfilePictureFor` is a method that asynchronously retrieves the user's Github profile picture and uses promises.

```javascript
getProfilePictureFor('yashdalfthegray').then(picture => {
    // picture here is the Github profile picture
}).catch(error => {
    // in case anything went south
});
```

### Functional programming - `Array.map()`

Every array in JavaScript has helper methods to help users iterate over the elements and perform certain actions to each one. One such function is `map()`. `map()` lets us transform each element in a given array and returns a new array with it. For example,

```javascript
[1, 2, 3].map(e => e * 2); // returns [2, 4, 6]
```

A common pattern in JavaScript is the async operations map. This is useful in the case where we have an array of data which will serve as input to an async function. Performing a map will call the async operation on each of elements and return an array of promises. You can either then use another functional programming concept like `reduce` or `filter` or wait for all of them to pass as we'll see in the next section.

### Asynchronous wait for all `Promise.all()`

There are some cases where you want to kick off a few async operations and then also wait for all of the results to roll in. One way is that you could start the first operation, then call `.then()` for the result for the first one, then start the second one, then call `.then()` for the result of the second one and so on. This might be valid for things that *need* to happen in sequence but that isn't a requirement, we can take advantage of parallel async operations using a `map` and `Promise.all`.

For example, lets say that we have a few users that we want to get Github profile pictures for and I have those users in an array.

```javascript
var picturePromises = ['alanlgirard', 'bcbrennecke', 'yashdalfthegray'].map(u => getProfilePictureFor(u));
// returns an array of 3 promises

Promise.all(picturePromises).then(results => {
    // results are now 3 profile pictures
}).catch(error => {
    // if anything went wrong with any of the operations
    // this will run instead of the .then() above.
});
```

## Tutorial

Get started with the tutorial [here](https://github.com/iot-accelerator/ohio-state-workshop/blob/master/tutorial.md).
