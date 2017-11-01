function bindFirstArg(func, a) {
  return function(b) {
    return func(a, b);
  };
}

const powerOfTwo = bindFirstArg(Math.pow, 2);
//this can create generic functions
console.log(powerOfTwo(3));
console.log(powerOfTwo(8));

//this can also work on the other argument as well
function bindSecondArg(func, b) {
  return function(a) {
    return func(a, b);
  };
}
const squareOf = bindSecondArg(Math.pow, 2);
const cubeOf = bindSecondArg(Math.pow, 3);
console.log(squareOf(3));
console.log(squareOf(4));
console.log(cubeOf(3));
console.log(cubeOf(4));

//We can make this even more generic!

const makePowersOf = bindFirstArg(bindFirstArg, Math.pow);

const powersOfThree = makePowersOf(3);
console.log(powersOfThree(2));
console.log(powersOfThree(3));

//so hard to wrap my brain around.========================================
Function.prototype.partialApply = function() {
  var func = this;
  args = Array.prototype.slice.call(arguments);
  return function() {
    return func.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
};

function num2hex() {
  function componentToHex(component) {
    const hex = component.toString(16);
    if (hex.length == 1) {
      return `0${hex}`;
    } else {
      return hex;
    }
  }
  return Array.prototype.map.call(arguments, componentToHex).join("");
}

//the function works with any number of inputs.

console.log(num2hex(100, 200));
console.log(num2hex(100, 200, 255, 0, 123));

//====================================================================
//Sandbox, play with function factories.

//binding first argument
console.log("=".repeat(50));

function factory(func, a) {
  return function(b) {
    return func(a, b);
  };
}

function repeatMySelf(num, words) {
  return words.repeat(num);
}

function findIndexOf(letter, str) {
  return str.indexOf(letter);
}

const findA = factory(findIndexOf, "a");
const repeat5times = factory(repeatMySelf, 5);

console.log(repeat5times("Play it again, Sam!"));
console.log(findA("Wot is happening?"));
console.log(findA("It is my understanding..."));
