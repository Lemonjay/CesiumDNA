

let elevation = {
  startValue: 0.,
  endValue: 20.,

  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      current: this.startValue,
      last: this.endValue,

      next() {
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (20.-0.)/60. };
        } else {
            return { done: false, value: this.current = 0. };
        }
      }
    };
  }
};

let azimuth = {
  startValue: -45.,
  endValue: 45.,

  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      current: this.startValue,
      last: this.endValue,

      // next() is called on each iteration by the for..of loop
      next() { // (2)
        // it should return the value as an object {done:.., value :...}
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (45. - (-45.))/60. };
        } else {
          return { done: false, value: this.current = -45. };
        }
      }
    };
  }
};

let range = {
  startValue: 3.,
  endValue: 200000.,

  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object,
    // asking it for next values using next()
    return {
      current: this.startValue,
      last: this.endValue,

      next() {
        if (this.current < this.last) {
          return { done: false, value: this.current = this.current+ (200000. - 3.)/60. };
        } else {
          return { done: false, value: this.current = 3. };
        }
      }
    };
  }
};


export {elevation, azimuth, range}
