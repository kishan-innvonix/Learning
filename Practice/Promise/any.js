// check for any single promise to fullfilled
const fun1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Settled first!");
})

const fun2 = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, "Rejected second!")
})

const fun3 = new Promise((resolve, reject) => {
    setTimeout(reject, 1500, "Rejected Third!")
})

Promise.any([fun1, fun2, fun3])
    .then(item => console.log(item))
    .catch(err => console.log(err))
