# General Functional Programming

Imperative v. Declarative

Imperative is a line by line execution in a forward manner. Sequential code resulting in an output.

Declarative tells more what to do than how to do it.

The main idea of functional programming is to make small functions that can do multiple things. 

"Am I telling it how to do something or what to do?"

Imperative = how to do it
Declarative = what to do

## Pure Functions

* Take an input
* Give an output
* Not dependent on outside 
* They do not alter the original data, they return something new. Immutable data.


Pure functions are reusable, and they are very predictable.

`forEach` is destructive. It destroys the original data.



## Map and Filter

Functions built on top of other functions. Abstracting the complexity to focus on something simpler.

```javascript 
function filter(predFn, arr) {
    const newArray = [];
    forEach(function(it, id, arr) {
        if(predFn(it, indx, arr)) {
            newArray.push(it);
        }
    }, arr)
    return newArray;
}
```

```javascript 
function map(fn, arr) {
    const newArray = [];
    forEach(function(it, id, arr) {
        newArray.push(fun(item, idx, arr))
    }, arr)
    return newArray;
}
```

Review your on code by making it more functions! Map and filter those things!

## Reduce

(Accumulator, currentValue), {}, '')


