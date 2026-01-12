// First settled win whether it rejected or resolved
const fun1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 200, "Settled first!");
})

const fun2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, "Rejected second!")
})

Promise.race([fun1, fun2])
    .then(item => console.log(item))
    .catch(err => console.log(err))