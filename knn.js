//INPUT : Arr of Objects w/ $label: $val pairs and class: $class 
//OUTPUT : A function that takes 1 Object as its argument and K and returns the most common class of its K nearest neighbors

function distance(a, b) {
  //returns the distance between two objects
  var res = 0;
  for (var k in a) {
    res += Math.pow(a[k] - b[k], 2);
  }
  res = Math.sqrt(res);
  return res;
};

function distancePriority (v, a, b) {
  //for two given objects, determines their priority in an array relative to v.
  return distance(v, a) - distance(v, b);
};

function knn (trainingSet) {
  return function(v, k) {
    var frequencies = {};
    var neighbors = trainingSet.sort(
      //close over v to sort neighbors according to distance from v.
        (a, b) => distancePriority(v, a, b)
      ) 
    .slice(0, k) //then take the k nearest neighbors
    .forEach( (neighbor) => { 
    if (frequencies[neighbor.class]) frequencies[neighbor.class]++;
    else frequencies[neighbor.class] = 1; 
  }); //determine the frequency of each neighbor's class


    //then find the highest occurring class and return it
    var res = 0;
    var cl = undefined;
    for (var k in frequencies) {
      if (frequencies[k] > res) {
        res = frequencies[k];
        cl = k;
      } 
    }

    return cl;
 }
};