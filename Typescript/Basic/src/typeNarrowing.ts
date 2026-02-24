type subCustom1 = {
  type: number;
  value: "age";
};

type subCustom2 = {
  type: string;
  value: "name";
};

type custom = {
  type: subCustom1 | subCustom2;
  value: "kishan";
};

function greet(name: custom): string {
  if (name.value) {
    return `hey ${name}`;
  }
  return "Hey !!!";
}

// forseful type asssersion
let customNumber: any = "42";

const lenghtCheck: number = (customNumber as string).length; // <-- this tells explicitly that i know its string and then go ahead

type Book = {
  name: string;
};

const stringifyObject = '{"name":"Kishan"}';

// here we tell explicitly that its an book object
// if we not tell then also its works
// with explicitly adding we can easily understand type, get suggetions and no feature error risk
const parsedObject = JSON.parse(stringifyObject) as Book;

console.log(parsedObject);
