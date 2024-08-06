var MyQueue = function () {
  this.stack1 = [];
  this.stack2 = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  while (this.stack1.length !== 0) {
    this.stack2.push(this.stack1.pop());
  }
  this.stack2.push(x);
  while (this.stack2.length !== 0) {
    this.stack1.push(this.stack2.pop());
  }
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
    return this.stack1.pop()
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
    return this.stack1[this.stack1.length - 1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
    return this.stack1.length === 0;
};

var obj = new MyQueue();
obj.push(1);
obj.push(2)
obj.push(3)
obj.push(4)
obj.push(5)


console.log(obj.pop())
console.log(obj.peek())
//arr use pop() and push()
