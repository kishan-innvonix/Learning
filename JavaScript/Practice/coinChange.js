
// Given an infinite supply of each denomination of Indian currency { 1, 2, 5, 10 } and a target value n. Find the minimum number of coins and/or notes needed to make the change for Rs n. 
// [1,2,5] -> 11

const coinChange = (n) => {

    let ten = Math.floor( n / 10 )
    n = n % 10;
    let five = Math.floor( n / 5 )
    n = n % 5;
    let two = Math.floor( n / 2 )
    let one = n % 2;

    return ten + five + two + one;
}

console.log(coinChange(126))