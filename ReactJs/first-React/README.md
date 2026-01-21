Named exports must be destructured using curly braces. Default exports do not.

The class attribute is a much used attribute in HTML, but since JSX is rendered as JavaScript, and the class keyword is a reserved word in JavaScript, you are not allowed to use it in JSX.instead use className

React components are like JavaScript functions, and return HTML.

Style properties are written in camelCase, e.g. fontSize, instead of font-size.
This is an important difference between HTML and JSX.

To be able to use conditional statements in JSX, you should put the if statements outside of the JSX, or you could use a ternary expression instead:

The name of the object is props, but you can call it anything you want.

React events are written in camelCase syntax:

onClick(fun()) <-- automatic run on load, 
onClick(() => fun()) <-- this is not run automatic as it just an function in which code is to call fun() when ever it clicks to the button

for conditional && and ternery would be good option for some case   

keys in react list
Keys allow React to keep track of elements. This way, if an item is updated or removed, only that item will be re-rendered instead of the entire list.
Keys must be unique among siblings, but they don't have to be unique across the entire application.

/////////////////////////////////////////////////
const key = "email";

const obj = {
  [key]: "test@gmail.com" 
};
  <--- here [] is required in key if we not using [] then it treat key text as key not email as key
/////////////////////////////////////////////////


constrolled(useState) vs uncontrolled(useRef) form components

Disadvantage of single page app
Slower first load (big JS bundle)
SEO issues (without SSR)
blank if fail js


React Router and React Router Dom
Browser Router, Routes, Route, Link, NavLink, Outlet, nested Route

useTransition
