# Functional Programming Techniques in JavaScript

## Styles of Functional Programming

* Data generic programming
* Mostly functional programming
* Functional Reactive Programming
* More?

## Partial Function Application and Currying

Partial Function application - The process of binding values to one or more arguments of a function that returns another function that accepts the remaining unbound arguments.

Currying - Transforming a function with multiple arguments into a function with one argument that returns another function that takes more arguments as needed.

### Function Manipulation
#### Apply, call, and the this keyword

In pure functional languages functions are applied, not called. JavaScript works the same way and provides utilities for manually calling or applying functions.

Functions are member of the same object as _this_.

The `call()` function lets you bind the _this_ keyword as it's first argument.

The `apply()` function is similar, but where `call` lets you send in a list of arguments, `apply` let's you send in an array. Both methods *allow you to write a function once and then inherit it in other objects without writing the function over again*. 

The `bind()` function function allows you to apply a method to one object with the this keyword assigned to another. Internally, it's the same as the call() function, but it's chained to the method and returns a new bounded function.

It's especially useful for callbacks, as shown in the following code snippet:

``` javascript
   function Drum(){
     this.noise = 'boom';
     this.duration = 1000;
     this.goBoom = function(){console.log(this.noise)};
   }
   var drum = new Drum();
   setInterval(drum.goBoom.bind(drum), drum.duration);
```

## Function Factories
_See functional programming practice 1_

Example:
``` javascript
const makePowersOf = bindFirstArg(bindFirstArg, Math.pow);

const powersOfThree = makePowersOf(3);
console.log(powersOfThree(2));
console.log(powersOfThree(3));
```

##Partial Application
This is creating functions for partial applications and currying. There are two ways to accomplish this:

* As a stand-alone function --> `function(func) {...}`
* As a pollyfill --> `Function.prototype.partial()`

What are pollyfills? Pollyfills are used to augment prototypes with new functions that we can then call to partially apply.

### Partial Application From the Left

This is where JavaScripts `call()` and `apply()` functions.

``` javascript
Function.prototype.partialApply = function(){
     var func = this;
     // binds this to a variable
     args = Array.prototype.slice.call(arguments);
     //slices the result of a call function applied to the special arguments object and stores it in a variable.
     return function(){
         //returns a function that applies the this article to 
       return func.apply(this, args.concat(
         Array.prototype.slice.call(arguments)
)); };
};
```

_See practice one for this in use_