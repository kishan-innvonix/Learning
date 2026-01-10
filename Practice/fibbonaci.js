
// Find nth number in fibonacci series using recursion
const fibonacci  = (n) => {
    return n < 0 ? (-1)**(n + 1) * helper(n * -1) : helper(n)
}

const helper = (n) => {
    if(n <= 1) return n;
    return helper(n - 1) + helper(n - 2)
}

// Find nth number in fibonacci series without recursion
const fibonacciNormal = (n) => {
    let sign = false;
    if(n < 0) {
        sign = true;
        n = -1 * n;
    }

    if(n <= 1) return n;

    let first = 0;
    let second = 1;
    let third;

    for(let i = 2 ; i <= n ; i++){
        third = first + second;
        first = second;
        second = third;
    }
    return sign ? (-1)**(n + 1) * third : third;
}


console.log("With recursion(4th item) : ", fibonacci(4))
console.log("Without recursion(4th item) : ", fibonacciNormal(4))
console.log("With recursion(6th item negative) : ", fibonacci(-6))
console.log("Without recursion(6th item negative) : ", fibonacciNormal(-6))