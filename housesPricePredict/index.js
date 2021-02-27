// this requirement tells where to make the calculations GPU or CPU
// this one is for CPU
require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfs");
const loadCSV = require("/.load-csv");

let { features, labels, testFeatures, testLabels } = loadCSV(
  "kc_house_data.csv",
  {
    shuffle: true,
    splitTest: 10,
    dataColumns: ["lat", "long"],
    label: ["price"],
  }
);
