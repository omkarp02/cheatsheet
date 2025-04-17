

javascript is high level single threaded garbage collected interpreted or jit compiled  prototype based with non blocking event loop

how javascript work

is has executinon context which has two thing variable enviorment and thread of execution

in variable enviorment thre is variable and function as the key value pair

when you run code a global exectuion context is created in two phase memory creation phase and then code execution phase

emory creation phase => for variable it allocate a specail value undefined and fucntion it store as it is

Hoisting

hoisting is a behavior where variable and function declarations are moved to the top of their scope before code execution, allowing you to use them before their actual declaration in the code

whenever you create a global exection context this is created
this point to global object where in browser it is window
this === global

whenever you can create anything in global space it get attaached to window object
anything inside fucnion is lcoal space and opposite is global space

Undefined is like a placeholder till a variable is not assigned a value.
undefined !== not defined
JS- loosly typed language since it doesn't depend on data type declarations.

1. Scope of a variable is directly dependent on the lexical environment.
2. Whenever an execution context is created, a lexical environment is created. Lexical environment is the local memory along with the lexical environment of its parent. Lexical as a term means in hierarchy or in sequence.
3. Having the reference of parent's lexical environment means, the child or the local function can access all the variables and functions defined in the memory space of its lexical parent.
4. The JS engine first searches for a variable in the current local memory space, if its not found here it searches for the variable in the lexical environment of its parent, and if its still not found, then it searches that variable in the subsequent lexical environments, and the sequence goes on until the variable is found in some lexical environment or the lexical environment becomes NULL.
5. The mechanism of searching variables in the subsequent lexical environments is known as Scope Chain. If a variable is not found anywhere, then we say that the variable is not present in the scope chain.

let and const are hoisted. we cant use them before initialization is result of "temporal dead zone".
js use different storage than global object to store let and cost. which is reason behind "temporal dead zone"

1. Code inside curly bracket is called block.
2. Multiple statements are grouped inside a block so it can be written where JS expects single statements like in if, else, loop, function etc.
3. Block values are stored inside separate memory than global. They are stored in block. (the reason let and const are called block scope)
4. Shadowing of variables using var, let and const.
5. The shadow should not cross the scope of original otherwise it will give error.
6. shadowing let with var is illegal shadowing and gives error.
7. var value is stored in nearest outer function or global scope and hence can be accessed outside block as well whereas same is not the case with let and const.

{
var a = 10
let b = 20
let c = 20
}

now b anc c are stored in block scope where as a is hoisted inside the global scope

var a = 100
{
var a = 10
let b = 20
let c = 20
console.log(a) this will give 10
}
console.log(a) this will give 10 since a is in global scope both a are pointing to same memory
so in this {} is block scope

var a = 100

function asdf(){
var a = 10
let b = 20
let c = 30
console.log(a)
console.log(b)
console.log(c)
}
asdf()
console.log(a)

hre a will be 100 since now fucntion forms a local scope and store a b c in local scope

Closure :Function bundled with its lexical environment is known as a closure. Whenever function is returned, even if its vanished in execution context but still it remembers the reference it was pointing to. Its not just that function alone it returns but the entire closure

Advnatages of closure

Uses of closures

- module design pattern
- currying
- fucntion like once
- memoize
- maintinaing state in async world
- settimeouts
- iterators

function x(){
for (var i = 1; i<=5; i++){
setTimeout(function (){
console.log(i);
}, I \* 1000)
}
}

here i will be 6 which is 6 times which is becasuse var is function scope for this you can check the block scope example and when we use let it will print 1, 2, 3, 4, 5 because it is block scope so for every iteration i will have a new copy

Things learned:

1.  What is Function Statement ?
    A. A normal function that we create using Naming convention. & By this we can do the Hoisting.
    For Ex - function xyz(){
    console.log("Function Statement");
    }

2.  What is Function Expression ?
    A. When we assign a function into a variable that is Function Expression. & We can not do Hoisting by this becz it acts like variable.
    For Ex - var a = function(){
    console.log("Function Expression");
    }

3.  What is Anonymous Function ?
    A. A Function without the name is known as Anonymous Function. & It is used in a place where function are treated as value.
    For Ex - function(){
    }

4.  What is Named Function Expression ?
    A. A function with a name is known as Named Function Expression.
    For Ex - var a = function xyx(){
    console.log("Names Function Expression");
    }

5.  Difference b/w Parameters and Arguments ?
    A. When we creating a function & put some variabels in this ( ) that is our Parameters.
    For Ex - function ab( param1, param2 ){
    console.log("
    }
    & When we call this function & pass a variabel in this ( ) that is our Arguments
    For Ex - ab( 4, 5 );

6.  What is First Class Function Or First class citizens?
    A. The Ability of use function as value,

-     Can be passed as an Argument,
-     Can be executed inside a closured function &
-     Can be taken as return form.
       For Ex - var b = function(param){
                             return function xyz(){
                                     console.log(" F C F ");
                             }
                     }

7. Function are heart of JS. They are called first class citizens or first class functions because they have the ability to be stored in the variables, passed as parameters and arguments. They can also be returned in the function.

1. Function that is passed on as argument to another function is called callback function.
1. setTimeout helps turn JS which is sinhlethreaded and synchronous into asynchronous.
1. Event listeners can also invoke closures with scope.
1. Event listeners consume a lot of memory which can potentially slow down the website therefore it is good practice to remove if it is not used.


1.First class functions 
The ability of functions, where the functions can be treated as variables, that is we can pass functions as arguments, return function and even assign function to another variables 

2.Higher order function 
Functions that takes one or more functions as argument 

3.Call back function 
Functions that can be passed as an argument to another function 

asyncrounous programming exist becasue callback exist

Two issues while using callbacks


1 - Callback hell
Thank you for making this series ❣️
When a function is passed as an argument to another function, it becomes a callback function. This process continues and there are many callbacks inside another's Callback function.
This grows the code horizontally instead of vertically. That mechanism is known as callback hell. 

2 - Inversion of control
The callback function is passed to another callback, this way we lose the control of our code. We don't know what is happening behind the scene and the program becomes very difficult to maintain. 
That process is called inversion of control. 

1. Before promise we used to depend on callback functions which would result in 1.) Callback Hell (Pyramid of doom) | 2.) Inversion of control
2. Inversion of control is overcome by using promise.
  2.1) A promise is an object that represents eventual completion/failure of an asynchronous operation.
  2.2) A promise has 3 states: pending | fulfilled | rejected.
  2.3)  As soon as promise is fulfilled/rejected => It updates the empty object which is assigned undefined in pending state.
  2.4) A promise resolves only once and it is immutable. 
  2.5) Using .then() we can control when we call the cb(callback) function.

3. To avoid callback hell (Pyramid of doom) => We use promise chaining. This way our code expands vertically instead of horizontally. Chaining is done using '.then()'
4. A very common mistake that developers do is not returning a value during chaining of promises. Always remember to return a value. This returned value will be used by the next .then()


🔑 Promises APIs are crucial for interviews and everyday application development, especially when handling asynchronous operations like parallel API calls.
🔑 Promise.all handles multiple promises simultaneously, returning an array of results when all promises are fulfilled, and throwing an error if any promise fails.
🔑 If any promise in Promise.all fails, the entire operation fails, and an error is thrown immediately without waiting for other promises.
🔑 Promise.allSettled waits for all promises to settle (whether fulfilled or rejected) before returning an array of results or errors, making it suitable for scenarios where partial failures are acceptable.
🔑 Promise.race returns the result of the first settled promise, whether it's success or failure, making it ideal for scenarios where the fastest response is required.
🔑 Promise.any is similar to Promise.race but waits for the first successful promise rather than the first settled one, making it suitable for scenarios where success is prioritized over speed.
🔍 Promise.any returns the result of the first successful promise and ignores subsequent failures, waiting for success.
🏁 Promise.any collects errors if all promises fail and returns an aggregated error array.
🔄 Promise.all returns an array of all results when all promises succeed, waiting for all to finish.
🛠 Promise.allSettled waits for all promises to settle (succeed or fail) before returning results, ensuring all promises are accounted for.
🏎 Promise.race returns the result of the first settled promise, whether success or failure, racing to return the fastest result.
📝 Promise status can be checked for rejection along with the reason for rejection, providing clarity in handling errors.
🚀 Promise.race returns the result of the first settled promise, whether it's a success or failure, regardless of the order in which promises are fulfilled.
💡 Explaining concepts in interviews requires not only understanding but also the ability to articulate ideas clearly, which is often a stumbling block for many candidates.
🔑 Promise.race resolves to the value/error of the first settled promise, regardless of success or failure, emphasizing the importance of understanding terminology in the Promise world.
📚 Familiarity with Promise terminology like "settled," "resolved," "rejected," "fulfilled," and "rejected" is crucial for effectively working with Promise APIs.
📝 Promise.any waits for the first settled promise, and if it's a success, returns the result, ignoring subsequent rejections until a success occurs.
📊 When all promises fail with Promise.any, it results in an "aggregate error," which consolidates all the errors encountered during execution.
🛠 Handling aggregate errors in Promise.any involves accessing the errors in an array format, allowing for comprehensive error management and analysis.

what is async await 
async is  a keyword if we put infront of fucntion it returns promise
and await is something that we can only use inside async functino


this

console.log(this) this point to global object

The behavior of the "this" keyword depends on the context, such as whether it's in a function, global space, or an arrow 
window.this this gets you this
obj.x()

this value of this is determined by how a fucntion is called

arrow functnio don't provider there own this bindning   it retain the this  value of enclosing lexical context


inheritance in JS => When an object trying to access variables and properties of another object

prototype is an Object that get attach to function/method/object and this object has some hidden properties

Whenever we create object/ function/ methods/ array/ variable , these all are attached with some hidden properties, which we call prototype

 _proto_ is reference to prototype ( or it points towards prototype ), if we want to access prototype, we do _proto_

prototype object has a prototype of its own, and so on until an object is reached with null as its prototype,  this is called prototype chaining


