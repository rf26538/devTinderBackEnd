//Dependency Injection

function processOrder(data, dependencies){
    const paymentInfo = dependencies.processPayment(data.amount);
    return paymentInfo;
}

function processPayment(amount){
  console.log("I am original");
  
    return {id: "123", amount:amount}
}

function greet(name) {
    return `Hello ${name}`;
}

function greetToPerson(name) {
    return `Hello ${name}`;
}

// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply, greet, greetToPerson, processOrder};
