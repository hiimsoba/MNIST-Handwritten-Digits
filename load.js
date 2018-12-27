// directory in which the training and testing data is stored
let data_directory = "data/";

// i literally copied most of this stuff from Daniel Shiffman, because I had no idea how to load this kind of data inside my sketch
// check out this video : https://www.youtube.com/watch?v=KhogNPC24eI
// at around 1:00:00 he's writing this thingie
function preload() {
  let startTime = millis();
  loadMNIST(() => {
    // print some stuff to the console, to see that the data has loaded and the time it took to load
    console.log('Finished loading the data!');
    console.log('Time spent loading : ' + nf((millis() - startTime) / 1000, 1, 3) + ' seconds.');
  });
}

// this is just a big oof
function loadMNIST(callback) {
  loadFile(data_directory + 'train-images.idx3-ubyte')
    .then(data => {
      trainData = data.slice(16);
      return loadFile(data_directory + 'train-labels.idx1-ubyte');
    })
    .then(data => {
      trainLabels = data.slice(8);
      return loadFile(data_directory + 't10k-images.idx3-ubyte');
    })
    .then(data => {
      testData = data.slice(16);
      return loadFile(data_directory + 't10k-labels.idx1-ubyte');
    })
    .then(data => {
      testLabels = data.slice(8);
      callback();
      // make the sets from the train and test data and labels
      trainSet = makeSet(trainData, trainLabels);
      testSet = makeSet(testData, testLabels);
      // and... we don't really need these anymore, i guess. shall clean some memory
      trainData = undefined;
      testData = undefined;
      trainLabels = undefined;
      testLabels = undefined;
    });
}

async function loadFile(file) {
  let r = await fetch(file);
  let data = await r.arrayBuffer();
  return new Uint8Array(data);
}
