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

