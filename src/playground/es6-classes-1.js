// A Class is like a blueprint, nothing is unique, rather a generic construct from which
// we can create unique instances out of it.
// Constructor function creates instances of the constructor object

class Person {
    // Anonymous' in this case is the DEFAULT value, if the name isnt passed in as an argument
    // constructor function gets call IMPLICITLY each time we create an instance
    constructor(name = 'Anonymous', age = 0) {
        this.name = name;
        this.age = age;
    }
    // Below (in the 'constructor body') are methods that are not unique and each Person shares
    // These wont run unless we EXPLICITLY call them
    getGreeting() {
        return `Hi my name is ${this.name}.`;
    }
    getDescription() {
        return `${this.name} is ${this.age} years old.`;
    }
}

// Below is how to create INSTANCES of the constructor object
const me = new Person('Marcus Guthrie', 28)
console.log(me.getGreeting())
console.log(me.getDescription())

const other = new Person(); // Arguments do no NEED to passed in - we can create defaults
console.log(other); //Person {name: "Anonymous", age: 0}

////// Subclasses
class Student extends Person {
    // need to pass in same arguments as parent constructor (defaults dont need to be repeated)
    constructor (name, age, degree){
        //super calls the parent constructor
        super(name, age);
        this.degree = degree;
    }
    hasDegree() {
        return !!this.degree; // logical not operator, (empty string = falsy value, string = truthy value)
    }
    // We can also override parent methods
    getDescription() {
        let description = super.getDescription();

        if (this.hasDegree()) {
            description += ` ${this.name} has a degree in ${this.degree}.`
        }
        return description;
    }
}

const peter = new Student('Peter', 21, 'Science');
console.log(peter.getDescription());

const jack = new Student();
console.log(jack.hasDegree())

class Traveller extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation
    }
    getGreeting() {
        let greeting = super.getGreeting();
        if (this.homeLocation) {
            greeting = `${greeting}. I'm visiting from ${this.homeLocation}`
        }
        return greeting;
    } 
}

const Hannah = new Traveller('Hannah', 25, 'London')
console.log(Hannah.getGreeting());