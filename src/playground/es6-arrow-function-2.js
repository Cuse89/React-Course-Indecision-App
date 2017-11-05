// arguments object - no longer bound with arrow functions

const add = (a, b) => {
  //  console.log(arguments) - will not work with arrow function
    console.log(a + b) // - will still work
    return a + b;
};
add(4 , 6);

const user = {
    name: 'Marcus',
    cities: ['Halifax', 'Liverpool', 'Ischgl'],
    // method below cannot be arrow function for 'this' to work
    // the word 'function:' below can be deleted in es6
    printPlacesLived () {
        // if we used 'this' below it would not work for es5 but arrow function does
        return this.cities.map((city) => this.name + ' has lived in ' + city);
    }
};

console.log(user.printPlacesLived());

// Challenge

const multiplier = {
    numbers: [2,9,4,8,3],
    multiplyBy: 4,
    multiply() {
        return this.numbers.map((num) => num * this.multiplyBy);
    };
};
console.log(multiplier.multiply())