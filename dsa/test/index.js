const PromisePollyfill = function (cb) {
  let res, rej;

  function onResolve(value) {
    res(value);
  }

  function onReject(value) {
    rej(value);
  }

  this.then = function (onRes) {
    res = onRes;
    return this;
  };

  this.catch = function (onRej) {
    rej = onRej;
    return this;
  };

  cb(onResolve, onReject);
};

const myPromise = new PromisePollyfill((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise.then((value) => {
  console.log(value);
});
