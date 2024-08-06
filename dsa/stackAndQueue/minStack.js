var MinStack = function () {
  this.stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  const length = this.stack.length;
  if (length === 0) {
    this.stack.push([val, val]);
  } else {
    const min = this.getMin();
    this.stack.push([val, min < val ? min : val]);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1][0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.stack[this.stack.length - 1][1]
};

//here this can be done using pair
//whenever storing element store in pair like [val, min] val is the value and min is the minimum element to this index like min elemnt from 0 to 5

var obj = new MinStack();
obj.push(1);
obj.push(2);
obj.push(3);

console.log(obj);
