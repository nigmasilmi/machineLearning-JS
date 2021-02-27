const data = [
  [300, 0.5, 16, 5],
  [400, 0.5, 16, 8],
  [300, 0.5, 16, 5],
  [300, 0.5, 16, 4],
  [250, 0.5, 16, 5],
  [280, 0.5, 16, 4],
];

// feature punto de lanzada en 300
// label bucket según algoritmo knn y k = 4
// predicción 5. Esto se obtiene con la data de entrenamiento
// con la data de testeo se compara y prueba que tan
// certera es la predicción

_.chain(data)
  .map((row) => [row[0] - 300, row[3]])
  .sortBy((row) => row[0])
  .slice(0, 4)
  .countBy((row) => row[1])
  .toPairs()
  .last()
  .first();
// ajustando la variable k para saber cómo cambia la predicción y cuál es el mejor valor
// iteramos en un rango de k (este rango se determina por un estimado de las observaciones a pie)

// algoritmo de entrenamiento
const knn = (trainingData, poinToPredict, k) => {
  _.range(1, 15).forEach((k) => {
    _.chain(data)
      .map((row) => [row[0] - poinToPredict[0], row[3]])
      .sortBy((row) => row[0])
      .slice(0, 4)
      .countBy((row) => row[1])
      .toPairs()
      .last()
      .first()
      .parseInt()
      .value();
  });
};

const distance = (pointA, pointB) => {
  return Math.abs(pointA - pointB);
};

const splitData = (data, testSetSize) => {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testSetSize);
  const trainingSet = _.slice(shuffled, testSetSize);
  return [testSet, trainingSet];
};

const analize = () => {
  // entrenar algoritmo
  // predecir para un punto dado
  // comparar el dato real con la predicción

  //1. shuffle
  //2. split data
  const [testSet, trainingSet] = splitData(data, testSetSize);
  testSet.forEach((observation) => knn(trainingSet, observation, k));
  // correr knn para data de entrenamiento, y testset
  // comparar para los resultados totales el nivel de certeza
  knn();
};

// preparándonos para considerar más features
const pointA = [1, 1];
const pointB = [4, 5];
// zip agrupa las posiciones iguales en un sólo array

_.chain(pointA)
  .zip(pointB)
  .map((ele) => ele[0] - ele[1]);

// es equivalente a

_.chain(pointA)
  .zip(pointB)
  .map(([a, b]) => a - b);

// entonces ahora la función para calcular la distancia entre dos observaciones sería
function distance(pointA, pointB) {
  return (
    _.chain(pointA)
      .zip(pointB)
      .map(([a, b]) => (a - b) ** 2)
      .sum()
      .value() ** 0.5
  );
}

const point = [350, 0.5, 16, 4];
// retornan un nuevo arr y no modifican el original
_.initial(point);
_.last(point);

// Normalización de la data. Tras bastidores
const points = [200, 150, 650, 430];
const min = _.min(points);
const max = _.max(points);

_.map(points, (point) => {
  return (point - min) / (max - min);
});
