# Functional Programming Techniques in JavaScript

## Styles of Functional Programming

* Data generic programming
* Mostly functional programming
* Functional Reactive Programming
* More?

## Partial Function Application and Currying

Partial Function application - The process of binding values to one or more arguments of a function that returns another function that accepts the remaining unbound arguments.

Currying - Transforming a function with multiple arguments into a function with one argument that returns another function that takes more arguments as needed.

*Whoa! Stop here. Okay, so currying is a lot simpler than it sounds. It's basically what you're doing down below in Function Factories, but is added to the Function object so that you can use it whenever. Now, currying will allow you to fully bind arguments together, that's the difference (I think) between it and the partial binding you'll see later. Continue on!*

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

### Currying

Oh boy, you got your work cut out for you. Okay, so take a look at this bad boy:

``` javascript

Function.prototype.curry = function (numArgs) {
     var func = this;
     // numArgs lets you either input args or define how many there are going to be.
     numArgs = numArgs || func.length;
     // recursively acquire the arguments
     function subCurry(prev) {
       return function (arg) {
         var args = prev.concat(arg);
         if (args.length < numArgs) {
           // recursive case: we still need more args
           return subCurry(args);
         }
         else {
           // base case: apply the function
           return func.apply(this, args);
} };
}
     return subCurry([]);
   };
```

This right here is a POLYFILL, a function added to the Function object. In this case it's our Curry function. Basically, it has the ability to take any number of arguments and bind them together.

``` javascript
function rgb2hex(r, g, b) {
     // nums2hex is previously defined in this chapter
     return '#' + nums2hex(r) + nums2hex(g) + nums2hex(b);
   }
   var hexColors = rgb2hex.curry();
   console.log(hexColors(11)) // returns a curried function
   console.log(hexColors(11,12,123)) // returns a curried function
   console.log(hexColors(11)(12)(123)) // returns #0b0c7b
   console.log(hexColors(210)(12)(0))  // returns #d20c00
  ```

   I think I got this. So, `rgb2hex` takes three arguments and returns the result of # + 3 functions. When `hexColors` is created it applies `curry` to rgb2hex, which has how many arguments? Yep, 3. So, now you can apply one execution to a variable to store a function that needs TWO more executions to full execute, or you can provide all three executions and get the result. *Take notice*, however, that if you provide three arguments in the same execution context, it will only count as the one execution and not all three variables that are needed. Look again at `hexColors`:

``` javascript
return '#' + nums2hex(r) + nums2hex(g) + nums2hex(b);
```

Three separate function calls, means you must have three separate executions. To further demonstrate this, take a look at the following:

``` javascript
var reds = function(g,b){return hexColors(255)(g)(b)};
   var greens = function(r,b){return hexColors(r)(255)(b)};
   var blues  = function(r,g){return hexColors(r)(g)(255)};
   console.log(reds(11, 12))   // returns #ff0b0c
   console.log(greens(11, 12)) // returns #0bff0c
   console.log(blues(11, 12))  // returns #0b0cff
```

Both currying and partial application are not just for reusable code, but are also used for the larger idea of "composition".

## Function Composition

In functional programing we want everything to be a function. Preferrably, we want all functions to be unary functions, meaning that they take only a single argument.

### Functions as building blocks

Classic example with math's `f(g(x))`.

``` javascript

   var compose = function(f, g) {
     return function(x) {
         return f(g(x));
  };
};
```

This is the process of building functions. And is coincidentally, very confusing...

``` javascript

Function.prototype.compose = function(prevFunc) {
     var nextFunc = this;
     return function() {
       return nextFunc.call(this,prevFunc.apply(this,arguments));
     }
}
```

This is our polyfill compose function. It takes the previous function created, applies the _this_ key word to `nextFunc` and returns a function that calls `nextFunc` with _this_ and applying the previous function's arguments? I think.

Functions are called from right to left. Meaning that the final argument in a chain is called first and then is run backwards. You can reverse this by switching the `prevFunc` and `nextFunc` arguments above, but this is called sequence instead of composition.

>To say that less code is better is missing the point. Code is more maintainable when the effective instructions are more concise. If you reduce the number of characters on the screen without changing
the effective instructions carried out, this has the complete opposite effect—code becomes harder to understand, and decidedly less maintainable; for example, when we use nested ternary operators,
or we chain several commands together on a single line. These approaches reduce the amount of 'code on the screen', but they don't reduce the number of steps actually being specified by that code. So the effect is to obfuscate and make the code harder to understand. The kind of conciseness that makes code easier to maintain is that which effectively reduces the specified instructions (for example, by using a simpler algorithm that accomplishes the same result with fewer and/ or simpler steps), or when we simply replace code with a message, for instance, invoking a third-party library with a well-documented API.

Composition works best with unary functions. The output of the first function is passed on to the second function, and so on. 

It is common practice to declare what type of input is expected to be input and what type of output the given function will generate. These are called *Type Signatures*. See below:

``` javascript
// getStringLength :: String -> Int
  function getStringLength(s){return s.length};
  // concatDates :: Date -> Date -> [Date]
  function concatDates(d1,d2){return [d1, d2]};
  // pureFunc :: (int -> Bool) -> [int] -> [int]
  pureFunc(func, arr){return arr.filter(func)}
```

