


const f = async() => { 
    console.log(1)
    await null;// this statement is not an promise but js intensionally consider as promise and try to resolve it, and while this it pause the console of 2
    console.log(2)
}
f()
console.log(3)
