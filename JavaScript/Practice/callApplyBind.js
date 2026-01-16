// Arrow functions ignores call, bind, apply

const user = {
    firstname: "Kishan",
    lastname: "Prajapati",
    age: 21,
}

function fullName (city){
    return `${this.firstname} ${this.lastname} from ${city}`;
}

console.log("With Call: ", fullName.call(user, "Patan")) // direct call

const bindFunction = fullName.bind(user, "Patan") // callback
console.log("With Bind: ", bindFunction())// does not call immediately instead bind "this" permanently

console.log("With Apply: ", fullName.apply(user, ["Patan"])) // array Argument
