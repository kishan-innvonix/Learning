

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
        items.push(item)
        return items;
    }
}

const cartHandler = cart();

cartHandler("TV")
cartHandler("Vegitable")
cartHandler("Fruit")
const items = cartHandler("Headset")

console.log(items)
