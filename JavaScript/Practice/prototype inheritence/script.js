
const fName = "Kishan"
const age = 21
console.log(fName.__proto__)
console.log(age.__proto__)
// just because of proto we can access diff methods of number , string etc...

const user = {
    name: "Kishan",
    age: 22,
    getFullInfo(){
        return `${this.name} with age of ${this.age}`
    }
}


const anotherUser = Object.create(user)
anotherUser.name = "Dhaval"

console.log(user)
console.log(anotherUser) 

console.log('User proto: ', user.__proto__)
console.log("Another User proto: ",anotherUser.__proto__)



const obj1 = {
    p1: "Inside 1"
}

const obj2 = {
    p2: "Inside 2",
    __proto__: obj1
}

const obj3 = {
    p3: "Inside 3",
    __proto__: obj2,
}
console.log(obj3)

// at the end point to the object for each and every class