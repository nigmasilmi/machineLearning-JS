const tf = require("@tensorflow/tfjs");
const _ = require("lodash");

/* 
gradientDescent() Run one iteration of GD and update m and b
train() Run GD until we get good values for m and b
test() Use a test data set to evaluate the accuracy of our calculated m and b
predict() Make a prediction using our calculated m and b
*/

class LinearRegression {
  constructor(features, labels, options) {
    this.features = features;
    this.labels = labels;
    this.options = Object.assign(
      { learningRate: 0.1, iterations: 1000 },
      options
    );
    this.m = 0;
    this.b = 0;
  }
  train() {
    for (let i = 0; i < this.options.iterations; i++) {
      this.gradientDescent();
    }
  }

  gradientDescent() {
    const currentGuessesForMPG = this.features.map((row) => {
      return this.m * row[0] + this.b;
    });

    const bSlope =
      (_.sum(
        currentGuessesForMPG.map((guess, i) => {
          return guess - this.labels[i][0];
        })
      ) *
        2) /
      this.features.length;

    const mSlope =
      (_.sum(
        currentGuessesForMPG.map((guess, i) => {
          return -1 * this.features[i][0] * (this.labels[1][0] - guess);
        })
      ) *
        2) /
      this.features.length;

    this.m = this.m - mSlope * this.options.learningRate;
    this.b = this.b - bSlope * this.options.learningRate;
  }
}

module.exports = LinearRegression;
