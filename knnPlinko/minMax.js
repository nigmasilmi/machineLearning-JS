const _ = require("lodash");

function minMax(data, featureCount) {
  // hacemos una copia de la data para no modificar la original
  const clonedData = _.cloneDeep(data);
  for (let i = 0; i < featureCount; i++) {
    // extraer el primer feature
    const column = clonedData.map((row) => {
      console.log("row is", row);
      console.log("row[i] is", row[i]);
      return row[i];
    });
    console.log("column is", column);
    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}

const points = [
  [200, 0.5, 17, 4],
  [234, 0.52, 19, 3],
  [240, 0.4, 23, 3],
];

const result = minMax(points, 3);
console.log("result is", result);
