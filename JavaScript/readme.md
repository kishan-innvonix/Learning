-in js nested comment not support

typeof undefined // "undefined"
typeof 0 // "number"
typeof 10n // "bigint"
typeof true // "boolean"
typeof "foo" // "string"
typeof Symbol("id") // "symbol"
typeof Math // "object"  (1)
typeof null // "object"  (2)
typeof alert // "function"  (3)

Primitive Data Types in JavaScript
Number
String
Boolean
Undefined
Null
Symbol (ES6)
BigInt

Non-Primitive (Reference) Data Types in JavaScript
Object
Array
Function
Date
RegExp
Map
Set
WeakMap
WeakSet

Numeric conversion rules:
undefined -> NaN
null -> 0

alert( 0 == false ); // true
alert( 0 == '' ); // true

// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0

The value undefined shouldn’t be compared to other values:
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)

Never add a newline between return and the value

// Function Declaration
function sum(a, b) {
  return a + b;
}

// Function Expression
let sum = function(a, b) {
  return a + b;
};

let age = prompt("What is your age?", 18);
// conditionally declare a function
if (age < 18) {
  function welcome() {
    alert("Hello!");
  }
} else {
  function welcome() {
    alert("Greetings!");
  }
}
// ...use it later
welcome(); // Error: welcome is not defined

let age = prompt("What is your age?", 18);
let welcome;
if (age < 18) {
  welcome = function() {
    alert("Hello!");
  };
} else {
  welcome = function() {
    alert("Greetings!");
  };
}
welcome(); // ok now

let double = n => n * 2;
// roughly the same as: let double = function(n) { return n * 2 }


"" + 1 + 0 = "10" 
"" - 1 + 0 = -1 
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" 
"  -9  " - 5 = -14 
null + 1 = 1 // (5)
undefined + 1 = NaN
" \t \n" - 2 = -2 

alert("There will be an error after this message")
[1, 2].forEach(alert)

prompt(question, [default])
Ask a question, and return either what the visitor entered or null if they clicked “cancel”.
confirm(question)
Ask a question and suggest to choose between Ok and Cancel. The choice is returned as true/false.
alert(message)
Output a message.

Debugging is the process of finding and fixing errors within a script

As we already know, a variable cannot have a name equal to one of the language-reserved words like “for”, “let”, “return” etc.
But for an object property, there’s no such restriction:
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};
alert( obj.for + obj.let + obj.return );  // 6


⚡ Super Common Use Cases of destructuring
Function parameters
function greet({ name, age }) {
  console.log(`Hi ${name}, you are ${age}`);
}
greet({ name: "Mia", age: 30 });
Swapping variables (no temp variable!)
let a = 1, b = 2;
[a, b] = [b, a];

With destructuring (🔥 combo)
const [first, ...rest] = [10, 20, 30, 40];
console.log(rest); // [20, 30, 40]

Objects do NOT create scope in JavaScript.
Only functions (and blocks for let/const) do


global object
Browser (non-strict): window
ES modules / strict mode: undefined

do we need isNaN() function? 
Can’t we just use the comparison === NaN? 
Unfortunately not. 
The value NaN is unique in that it does not equal anything, including itself:
Nan === Nan // false

typeof array // object
to check for array Array.isArray(Array)


To add/remove elements:

push(...items) – adds items to the end,
pop() – extracts an item from the end,
shift() – extracts an item from the beginning,
unshift(...items) – adds items to the beginning.
splice(pos, deleteCount, ...items) – at index pos deletes deleteCount elements and inserts items.
slice(start, end) – creates a new array, copies elements from index start till end (not inclusive) into it.
concat(...items) – returns a new array: copies all members of the current one and adds items to it. If any of items is an array, then its elements are taken.


To search among elements:

indexOf/lastIndexOf(item, pos) – look for item starting from position pos, and return the index or -1 if not found.
includes(value) – returns true if the array has value, otherwise false.
find/filter(func) – filter elements through the function, return first/all values that make it return true.
findIndex is like find, but returns the index instead of a value.
To iterate over elements:

forEach(func) – calls func for every element, does not return anything.


To transform the array:

map(func) – creates a new array from results of calling func for every element.
sort(func) – sorts the array in-place, then returns it.
reverse() – reverses the array in-place, then returns it.
split/join – convert a string to array and back.
reduce/reduceRight(func, initial) – calculate a single value over the array by calling func for each element and passing an intermediate result between the calls.

Array.isArray(value) checks value for being an array, if so returns true, otherwise false.


Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.


Methods and properties:

new Map([iterable]) – creates the map, with optional iterable (e.g. array) of [key,value] pairs for initialization.
map.set(key, value) – stores the value by the key, returns the map itself.
map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
map.has(key) – returns true if the key exists, false otherwise.
map.delete(key) – removes the element by the key, returns true if key existed at the moment of the call, otherwise false.
map.clear() – removes everything from the map.
map.size – returns the current element count.


Methods and properties:

new Set([iterable]) – creates the set, with optional iterable (e.g. array) of values for initialization.
set.add(value) – adds a value (does nothing if value exists), returns the set itself.
set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
set.has(value) – returns true if the value exists in the set, otherwise false.
set.clear() – removes everything from the set.
set.size – is the elements count.


Destructuring assignment is a special syntax that allows us to “unpack” arrays or objects into a bunch of variables, as sometimes that’s more convenient.

function sum(a) {
  return function(b) {
    return a + b; // takes "a" from the outer lexical environment
  };
}
alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4


If a code block is inside a function, then var becomes a function-level variable:

call and