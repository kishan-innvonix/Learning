

const counter = () => {
    let count = 0;

    return () => {
        count = count + 1;
        return count;
    }
}

let count = counter()
console.log(count())
console.log(count())
console.log(count())
console.log(count())
console.log(count())



const cart = () => {
    let items = [];

    return (item) => {
        items.push(item);
        return items;
    }
}

const foodItems = cart();
const electronicItems = cart();

foodItems("Banana");
foodItems("Apple");
console.log( foodItems("Vagetable") );

electronicItems("TV");
electronicItems("Remote");
console.log( electronicItems("Frige") );


// Different instance has different lexical Environment
