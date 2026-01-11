// wait for all promise to fullfilled 
const fun1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Settled first!");
})

const fun2 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("Settled second")
    }, 1000)
})

Promise.all([fun1, fun2]).then(item => displayContent(item))

function displayContent(items){
    for(let item of items){
        console.log(item)
    }
}