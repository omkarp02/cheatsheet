var MyStack = function () {
  this.queue1 = [];
  this.queue2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.queue2.push(x);
  while (this.queue1.length !== 0) {
    this.queue2.push(this.queue1.shift());
  }

  while (this.queue2.length !== 0) {
    this.queue1.push(this.queue2.shift());
  }
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  return this.queue1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  return this.q1[0];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.q1.length === 0;
};

var obj = new MyStack();
obj.push(1);
obj.push(2);
obj.push(3);
obj.push(4);
console.log(obj.pop());

//add x to q2
//push q1 to q2
//move q2 to q1