// this requirement tells where to make the calculations GPU or CPU
// this one is for CPU
require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("./load-csv");

const knn = (features, labels, predictionPoint, k) => {
  const { mean, variance } = tf.moments(features, 0);
  const scaledPrediction = predictionPoint.sub(mean).div(variance.pow(0.5));
  return (
    features
      .sub(mean)
      .div(variance.pow(0.5))
      .sub(scaledPrediction)
      .pow(2)
      .sum(1)
      .pow(0.5)
      .expandDims(1)
      .concat(labels, 1)
      .unstack()
      .sort((a, b) => {
        return a.get(0) > b.get(0) ? 1 : -1;
      })
      .slice(0, k)
      .reduce((acc, pair) => {
        return acc + pair.get(1);
      }, 0) / k
  );
};

let { features, labels, testFeatures, testLabels } = loadCSV(
  "kc_house_data.csv",
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ["lat", "long", "sqft_lot", "sqft_living"],
    labelColumns: ["price"],
  }
);

// console.log("features: ", features);
// console.log("testFeatures: ", testFeatures);
// console.log("//////////////");
// console.log("labels: ", labels);
// console.log("testLabels: ", testLabels);

features = tf.tensor(features);
labels = tf.tensor(labels);
// testFeatures = tf.tensor(testFeatures);
// testLabels = tf.tensor(testLabels);

testFeatures.forEach((testpoint, index) => {
  const result = knn(features, labels, tf.tensor(testpoint), 10);
  const err = ((testLabels[index][0] - result) / testLabels[index][0]) * 100;
  console.log("Guess", result, "real value: ", testLabels[index][0]);
  console.log("Error", err, "%");
});

// debugging node --inspect-brk index.js
// then in chrome about:inspect
