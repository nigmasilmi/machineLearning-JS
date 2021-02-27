const outputs = [];
const predictionPoint = 300;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  // console.log(outputs);
}

function runAnalysis() {
  // Write code here to analyze stuff
  const testSetSize = 10;
  const k = 10;
  let accuracy;
  _.range(0, 3).forEach((feature) => {
    // feature 0, feature 1, feature 2
    const data = _.map(outputs, (row) => [row[feature], _.last(row)]);
    const [testSet, trainingSet] = splitData(minMax(data, 1), testSetSize);

    accuracy = _.chain(testSet)
      .filter(
        (testPoint) =>
          knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint)
      )
      .size()
      .divide(testSetSize)
      .value();
    console.log(`Para feature: ${feature}, la certeza es ${accuracy}`);
  });
}

function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
}

function splitData(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);
  return [testSet, trainingSet];
}

function knn(data, point, k) {
  // point does not have the label now
  return _.chain(data)
    .map((row) => {
      return [distance(_.initial(row), point), _.last(row)];
    })
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

// featureCount son las features que queremos normalizar
// primero porque iremos quitando o agregando features
// segundo porque el último valor de la observación es el bucket, que no queremos normalizar

function minMax(data, featureCount) {
  // hacemos una copia de la data para no modificar la original
  const clonedData = _.cloneDeep(data);
  for (let i = 0; i < featureCount; i++) {
    // extraer el primer feature
    const column = clonedData.map((row) => row[1]);
    const min = _.min(column);
    const max = _.max(column);

    for (let j = 0; j < clonedData.length; j++) {
      clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
    }
  }

  return clonedData;
}

const points = [
  [200, 0.5, 16, 4],
  [234, 0.52, 16, 3],
  [240, 0.4, 16, 3],
];

const result = minMax(points, 3);
console.log("result is", result);
