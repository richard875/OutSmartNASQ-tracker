// const holidays: any = require("../data/static/holidays2021.json");

// console.log(holidays[0].monthNumber);

// ** what happened if market opened/closed during the two step?**

let arr1 = [1, 2, 3, 4, 5, 6, 7];
let arr2 = [1, 2, 3, 4, 5];

let difference = arr1.filter((x) => !arr2.includes(x));
console.log(difference);
