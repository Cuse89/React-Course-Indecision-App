// Block Scoping

const fullName = 'Marcus Guthrie';
let firstName; // Needs to be defined globally to be recognised outside of block below

if (fullName) {
    firstName = fullName.split(' ')[0];
    console.log(firstName);
}

console.log(firstName);