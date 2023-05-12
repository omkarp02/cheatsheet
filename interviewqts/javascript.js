/*
Everything in javascript happen inside the execution context

Variable Enviroment is in which variable and function are stored as key value pair
Thread of Excecution is  in which the whole code is excecuted one command at a time means one line at a time
so javascript is a single threaded syncronous language

so in first phase javascript does memory allocation it set undefined to every variable except in case of fucntino the whole functioncode is stored in variable environment

second phase in code excecution phase values are assinged to the variable and if  a function is called function is invoked, funciton arelike mini program whenever it is invoked new excutino context is created

wherever we run code the whole global context is put inside the call stack than code get executed many exection context are pushed and pop 

What is hoisting?
explain about excecution context how thing works like variable are first marked undefined so how is hoisting happening

anything that is not inside function is global space

what is difference between undefinded and not defined?
Undefined is like a placeholder till a variable is not assigned a value.
not defined variable is not declared only is not there

Scope 

where you can access specific funtion or variable

Lexical Env

lexical means in heriachy
lexical env is created wherever a execution env is created a lexcial env is the local memory + reference to lexical env of parent 
wherever execution context is created you get access to the lexical env of the parent
so c is lexicaly inside a

so the chain of lexical env is scope chain

*/

function a() {
  var b = 10;
  c();
  function c() {
    console.log(b);
  }
}

a();
console.log(b);

/* 
let and const

let is stored in different memory space than global
var is attached to the global object means they are stored in global memory space

temporal dead zone is the time since the let variable was hoisted till it was allocated with value or is initalized some value  
so we cannot access a variable in temporal dead zone
*/

console.log(a);
let a = 10;

/* 
    you can't access let by window
*/

let a = "asdf";
var b = "fdfa";
window.a; //return undefined
window.b; //return 'fdfa

/* 
    let and const cannot be redeclared

    block  - to group multi statement together 
    black scope means what all statement and variable we can access inside the block
*/

{
  let a = 3;
  const b = 3;
  var c = 3;
  //here a seperate block scope is made for let and const var as  a is inside global scope so let and const are stored inside seprate memory space
}

/* 
    Closure : funciton bundled together with its lexical env is know as closure

*/

//explain with this example

function x() {
  let y = 2;
  function z() {
    console.log(y);
  }
  y = 100;
  return z;
}

let a = x(); //here not just the function but the closure was returned funciton along with its lexical env
console.log(a);

if (true)
  if (true) {
    //this excepts a single statement here so we use block scope

    let a = 2;
    let b = 4;
  }

//now we can group multi statement as one statement and use it

/* 
closure uses
module desing pattern
currying
memoize
function like once
mainting state in async world
settimeouts
iterators
*/

function x() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
} //not work

function y() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function () {
      console.log(i);
    }, i * 1000);
  }
} //work

function z() {
  for (var i = 0; i < 5; i++) {
    function closuree(i) {
      setTimeout(function () {
        console.log(i);
      }, i * 1000);
    }
    closuree(i);
  }
}

x();

//fucntion constructer variable this is also example of data privacy

function counter() {
  var count = 0;
  this.incrementcounter = function () {
    count++;
    console.log(count);
  };

  this.decrementcounter = function () {
    count--;
    console.log(count);
  };
}

var counter1 = new Counter();

counter1.incrementcounter();

//disadvantage of closure
//consumptino of memory

//function statement
function a() {
  console.log("a called");
}

//fuction expression
var b = () => {
  console.log("b called");
};

//named function
let c = function xyz() {};

xyz(); // xyz is not created in global scope so it will give error

//first class function  or first class citizen

// The Ability of use function as value,
// *     Can be passed as an Argument,
// *     Can be executed inside a closured function &
// *     Can be taken as return form.
var b = function (param) {
  return function xyz() {
    console.log(" F C F ");
  };
};

// Function that is passed on as argument to another function is called callback function.

//event loop

// 1. Browser has superpowers that are lent to JS engine to execute some tasks, these superpowers include web API's such as console, location, DOM API, setTimeout, fetch, local storage.
// 2. Callback functions and event handers are first stored in Web API environment and then transferred to callback queue.
// 3. Promises and mutation observer are stored in API environment and then transferred to microtask queue.
// 4. Event loop continuously observes call stack and when it is empty it transfers task to call stack.
// 5. Micro task is given priority over callback tasks.

//always remember micro task queue has higher priority

//higher order function

// Function that takes another function as argument(callback function) is known as Higher order functions.
// It is this ability that function can be stored, passed and returned,  they are called first class citizens.

const area = function (r) {
  return Math.PI * r * r;
};

const calculate = function (r, logic) {
  const output = [];
  for (let i = 0; i < 5; i++) {
    output.push(logic(r[i]));
  }
};

calculate(4, area);
