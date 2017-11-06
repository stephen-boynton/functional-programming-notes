# Higher Order Functions

All functions are *values*. They can be passed around from one to another. Higher Order functions are good for Composition. We take smaller functions to create larger and more complex functions.

You are doing composition any time you use a higher order function. Pure functions have the ability to be 'decoupled' from the other function.

``` javascript
const isDog = (animal) => animal.species === "dog";
aninamls.filter(isDog);
```

## Map

Map transforms the array. Filter returns a true or false value, "Should this item be kept in the array?" It's about using the data, changing it.

## Reduce

