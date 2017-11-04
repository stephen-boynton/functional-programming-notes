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

//================================ Currying ==========================

console.log("Currying", "=".repeat(50));

Function.prototype.curry = function(numArgs) {
  var func = this;
  numArgs = numArgs || func.length;
  // recursively acquire the arguments
  function subCurry(prev) {
    return function(arg) {
      var args = prev.concat(arg);
      if (args.length < numArgs) {
        // recursive case: we still need more args
        return subCurry(args);
      } else {
        // base case: apply the function
        return func.apply(this, args);
      }
    };
  }
  return subCurry([]);
};

function rgb2hex(r, g, b) {
  // nums2hex is previously defined in this chapter
  return "#" + num2hex(r) + num2hex(g) + num2hex(b);
}
var hexColors = rgb2hex.curry();
console.log(hexColors(11)); // returns a curried function
console.log(hexColors(11, 12, 123)); // returns a curried function
console.log(hexColors(11)(12)(123)); // returns #0b0c7b
console.log(hexColors(210)(12)(0)); // returns #d20c00

//=============================== Composition ====================

console.log("Composition", "=".repeat(50));

Function.prototype.compose = function(prevFunc) {
  var nextFunc = this;
  return function() {
    return nextFunc.call(this, prevFunc.apply(this, arguments));
  };
};

// stringToArray :: String -> [Char]
function stringToArray(s) {
  return s.split("");
}
// arrayToString :: [Char] -> String
function arrayToString(a) {
  return a.join("");
}
// nextChar :: Char -> Char
function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}
// previousChar :: Char -> Char
function previousChar(c) {
  return String.fromCharCode(c.charCodeAt(0) - 1);
}
// higherColorHex :: Char -> Char
function higherColorHex(c) {
  return c >= "f" ? "f" : c == "9" ? "a" : nextChar(c);
}
// lowerColorHex :: Char -> Char
function lowerColorHex(c) {
  return c <= "0" ? "0" : c == "a" ? "9" : previousChar(c);
}
// raiseColorHexes :: String -> String
function raiseColorHexes(arr) {
  return arr.map(higherColorHex);
}
// lowerColorHexes :: String -> String
function lowerColorHexes(arr) {
  return arr.map(lowerColorHex);
}

var lighterColor = arrayToString
  .compose(raiseColorHexes)
  .compose(stringToArray);
var darkerColor = arrayToString.compose(lowerColorHexes).compose(stringToArray);
console.log(lighterColor("af0189")); // Returns: 'bf129a'
console.log(darkerColor("af0189")); // Returns: '9e0078'
