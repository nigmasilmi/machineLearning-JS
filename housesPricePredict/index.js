// this requirement tells where to make the calculations GPU or CPU
// this one is for CPU
require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");
const loadCSV = require("./load-csv");

const knn = (features, labels, predictionPoint, k) => {
  return (
    features
      .sub(predictionPoint)
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
    dataColumns: ["lat", "long"],
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

const result = knn(features, labels, tf.tensor(testFeatures[0]), 10);
console.log("Guess", result, "real value: ", testLabels[0][0]);
