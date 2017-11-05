function square(x) {
    return x * x;
};

console.log(square(3))

// Arrow function needs to be an expression
const squareArrow = (x) => x * x;
// is the same as 

// const squareArrow = (x) => {
//     return x * x;
// }

console.log(squareArrow(8));


// Challenge - use both arrow function methods to get first name 
// 1
const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
};
console.log(getFirstName('marcus guthrie'))
// 2
const getFirstName2 = (fullName) => fullName.split(' ')[0];

console.log(getFirstName2('Patricia Pumpernickel'));
