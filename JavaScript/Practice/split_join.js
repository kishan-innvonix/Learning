
// const s = "Kishan"

// const arr = s.split("")

// console.log(arr)

// const merged = arr.reduce((acc, curr) => {
//     return acc + "'" + curr
// }, "")

// console.log(merged)

// const a = "git-github"

// const camelCase = a.split("-").map((ele, index) => {
//     return index == 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
// }).join("")

// console.log(camelCase)


// let arr = [5, 3, 8, 1];

// const filterRange = (arr, a, b) => {
//     return [...arr].sort()
// }

// console.log(filterRange(arr, 1, 4));
// console.log(arr.slice());



// let calc = new Calculator;

// function Calculator(){
//     const calculate = (s) => {
//         const items = s.split(" ");
//         console.log(items)
//     }
// }

// console.log( calc.calculate("3 + 7") ); // 10

// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let users = [ john, pete, mary ];

// let names = users.map(item => item.name)

// console.log(names)


// let john = { name: "John", surname: "Smith", id: 1 };
// let pete = { name: "Pete", surname: "Hunt", id: 2 };
// let mary = { name: "Mary", surname: "Key", id: 3 };

// let users = [ john, pete, mary ];

// let usersMapped = users.map((item) => {
//     return {
//         fullName: `${item.name} ${item.surname}`,
//         id: item.id
//     }
// })

// /*
// usersMapped = [
//   { fullName: "John Smith", id: 1 },
//   { fullName: "Pete Hunt", id: 2 },
//   { fullName: "Mary Key", id: 3 }
// ]
// */
// console.log(usersMapped)
// console.log( usersMapped[0].id ) // 1
// console.log( usersMapped[0].fullName ) // John Smith



// let john = { name: "John", age: 25 };
// let pete = { name: "Pete", age: 30 };
// let mary = { name: "Mary", age: 28 };

// let arr = [ pete, john, mary ];

// function sortByAge(arr){
//     arr.sort((a, b) => a.age - b.age)
// }

// sortByAge(arr);

// // now: [john, mary, pete]
// console.log(arr[0].name); // John
// console.log(arr[1].name); // Mary
// console.log(arr[2].name); // Pete


// function unique(arr) {
//     let result = [];
//     arr.forEach(item => {
//         if(result.indexOf(item) == -1){
//             result.push(item)
//         };
//     })
//     return result.join();
// }

// let strings = ["Hare", "Krishna", "Hare", "Krishna",
//   "Krishna", "Krishna", "Hare", "Hare", ":-O"
// ];

// console.log( unique(strings) ); // Hare, Krishna, :-O




// let users = [
//   {id: 'john', name: "John Smith", age: 20},
//   {id: 'ann', name: "Ann Smith", age: 24},
//   {id: 'pete', name: "Pete Peterson", age: 31},
// ];

// const groupById = (users) => {
//     return users.reduce((acc, curr) => {
//       acc[curr.id] = curr;
//       return acc
//     },{})
// }

// let usersById = groupById(users);

// console.log(usersById)
// /*
// // after the call we should have:

// usersById = {
//   john: {id: 'john', name: "John Smith", age: 20},
//   ann: {id: 'ann', name: "Ann Smith", age: 24},
//   pete: {id: 'pete', name: "Pete Peterson", age: 31},
// }
// */


// let map = new Map();

// map.set("name", "John");

// console.log( map.keys());


// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };

// let sum = 0;
// for(let salary of Object.values(salaries)){
//     sum += salary;
// }
// console.log(sum)


// (function(){
//     console.log("IIFE")
// })()


// const counter = () => {
//     setTimeout(console.log,1000,"Kisha")
// }
//  counter();


const user = {
  name: "Kishan",
  greet() {
    console.log(this.name);
  }
};

const greetFn = user.greet;
greetFn();