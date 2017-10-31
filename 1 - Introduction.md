# Functional Programming in JavaScript

## The Demonstration - An E-Commerce Website

Imperative code tends to have more lines of code, using step-by-step instructions. Functional programming instead seeks to describe the problem mathematically so that the machine can do the rest.

The examples in the book contain a lot of higher order functions. The idea, it seems, is to use functions, classes and object that can then self-create new versions of anything that is needed. Maybe more setup, but the return is beneficial?

Summary: Smaller pieces, easier to understand, and easier to troubleshoot.

# Fundamentals of Functional Programming

## Differences between Imperative and Functional Programming

* Programming style
    * Imperative - Step-by-step instructions
    * Functional - Define what the problems are and what data transformations are needed to achieve the solution.
* State Changes
    * Imperative - Important
    * Functional - Non-existent
* Order of Execution
    * Imperative - Important
    * Functional - Not as important
* Primary Flow Control
    * Imp. - loops, conditionals, function calls
    * Func. - Function calls and recursion
* Primary Manipulation Unit
    * Structures and class objects
    * Func. - Functions as first-class objects and data sets

A system must allow for Lambada calculus to be considered functional. It should also allow for immutable data and lazy evaluation.

## Benefits to Functional Programming

* Cleaner Code
    * simpler, smaller, cleaner
    * Simplifies debugging, testing and maintenance
* Modularity
    * big problems broken down
* Reusability
    * Pure functions, baby.
    * You will begin to compile your own library of functions
* Reduced Coupling
    * Meaning that code has less dependencies on other files
* Mathematically Correct

*Loops and temporary variables can typically be done away with for higher order functions*

# Working with Functions

Functional programming is all about decomposing a problem into a set of functions. 

This is use with closure. This has blown my mind

``` javascript
 var ValueAccumulator = function() {
     var values = [];
     var accumulate = function(obj) {
       if (obj) {
         values.push(obj.value);
         return values;
}
else {
         return values;
       }
};
     return accumulate;
   };
   //This allows us to do this:
   var accumulator = ValueAccumulator();
   accumulator(obj1);
   accumulator(obj2);
   console.log(accumulator());
   // Output: [obj1.value, obj2.value]
```

The above function still has access to the values array due to the scope it has on closure.

## Higher Order Functions 

Higher order functions are used to pass logic from one function to another. This is possible because functions are first-class citizens in the JavaScript, aka they are treated as primitives.

## Pure Functions

Pure functions only take and input and provide an output. They are not dependent on any outside functions or variables to exist. The example given here is the difference between these two:

``` javascript
   // function that prints a message to the center of the screen
   var printCenter = function(str) {
     var elem = document.createElement("div");
     elem.textContent = str;
     elem.style.position = 'absolute';
     elem.style.top = window.innerHeight/2+"px";
     elem.style.left = window.innerWidth/2+"px";
     document.body.appendChild(elem);
   };
   printCenter('hello world');
   // pure function that accomplishes the same thing
   var printSomewhere = function(str, height, width) {
     var elem = document.createElement("div");
     elem.textContent = str;
     elem.style.position = 'absolute';
     elem.style.top = height;
     elem.style.left = width;
     return elem;
   };
   document.body.appendChild(
     printSomewhere('hello world',
     window.innerHeight/2)+10+"px",
     window.innerWidth/2)+10+"px")
 );
 ```

 ## Method Chains

 Method chains or "Builder Patter" is the chaining of methods to achieve a result. 

 ## Recursion

 Handled carefully, uses a base case to determine the end of the recursion. 

 ## Lazy Evaluation

 "Lazy evaluation, also known as non-strict evaluation, call-by-need and deferred execution, is an evaluation strategy that waits until the value is needed to compute the result of a function and is particularly useful for functional programming."

 "It's clear that a line of code that states x = func() is calling for x to be assigned to the returned value by func(). But what x actually equates to does not matter until it is needed. Waiting to call func() until x is needed is known as lazy evaluation."

 ## Array.prototype.map()

 This simple applies the call back function to each item in the array. 

 ## Array.prototype.filter()

 This method is used to remove things from an array. The callback must return true or false. If true, the item is returned, if false it is not.

 ## Array.prototype.reduce()

 This is used to cumulate all of the values of the array into one. The callback performed needs to contain the logic to combine the objects. Like adding numbers, multiplying numbers or concatenating a string. The parameters are *previousValue*, *currentValue*, index, array.

 ``` javascript 
 var numbers = [1,2,3,4];
   // sum up all the values of an array
   console.log([1,2,3,4,5].reduce(function(x,y){return x+y}, 0));
   // sum up all the values of an array
   console.log([1,2,3,4,5].reduce(function(x,y){return x+y}, 0));
   // find the largest number
   console.log(numbers.reduce(function(a,b){
     return Math.max(a,b)}) // max takes two arguments
   );
   ```

## Array.prototype.concat()

Takes an existing array, leaves it intact and returns an array combined with any other value, such as a fellow array! Well, not an object. Exciting.