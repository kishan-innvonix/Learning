
let user1 = {
  firstName: "Ilya",
  sayHi() {
    console.log("Reguler Function: " + this.firstName);
  }
};

user1.sayHi(); // Ilya

let user2 = {
  firstName: "Ilya",
  sayHi:() => {
    console.log("Arrow Function: " + this.firstName);
  }
};

user2.sayHi(); // undifined