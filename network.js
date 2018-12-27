// 28 * 28 images, which is, you got it, 784
const PIXS = 784;

// train the network with "len" amount of images from the given set ( initially, the training set )
// might break if you give it another data set... so yeah, be sure to give it the right arguments
// 60k elements for the training set and 10k for the testing set, if you wanna be smart and train it on that
// but i recommend calling trainNetwork() from the dev console. just like that.
function trainNetwork(dataSet = trainSet, len = 60000) {
  // make an auxiliary set, which is a copy of the given data set
  let auxSet = dataSet.slice();
  // START THE TIMER!
  let startTime = millis();
  // train it on "len" images
  for (let i = 0; i < len; i++) {
    // pick a random index
    // see? random training. efficiency.
    // improvise. adapt. overcome. this was 100% not necessary, but hey... cringe?
    let j = floor(random(auxSet.length));
    // the input is the first element of the set at index j
    let input = auxSet[j][0];
    // and now get the target
    // refactor this later, maybe, to have [1] as the target directly, and not have to get the target everytime
    // will save some time, but will eat a bit of memory
    let target = getTarget(auxSet[j][1]);
    // train the net on the image and its label
    nn.train(input, target);
    // and delete the image from the set
    auxSet.splice(j, 1);
  }
  // WOWOOWOWOWOWOWOWO! WE DID IT!
  console.log("Finished learning!");
  console.log('Time spent learning : ' + nf((millis() - startTime) / 1000, 1, 3) + ' seconds.');
}

// truth time, now we test the network
// HYPE HYPE HYPE
function testNetwork(dataSet = testSet, n = 10000) {
  // count the number of correct guesses
  let correct = 0;
  // and also start a timer
  let startTime = millis();
  // and now for each of those "n" pairs image-label
  for (let i = 0; i < n; i++) {
    // get a guess
    let output = getGuess(i, dataSet, false);
    // and if it's correct, YIKES, our net is a genius!
    // increase the correct number of guesses
    if (output == dataSet[i][1]) {
      correct++;
    }
  }
  // print some things to make it look cool
  console.log("Finished testing the network!");
  // get a percentage of accuracy which is (correct / n) * 100
  // and format it to display like only two decimals
  console.log("Results : " + nf(100 * correct / n, 2, 2) + "% accuracy");
  // and print some absolute values, as well
  console.log(correct + " out of " + n);
  // and print the time it took it to go through all of them
  console.log('Time spent testing : ' + nf((millis() - startTime) / 1000, 1, 3) + ' seconds.');
}

// gets a guess
// k is the index that we wanna guess from the "data" set
// and... show the image, if you wanna
function getGuess(k, data, show = true) {
  // show the image if the user desires it
  if (show) {
    printImage(data[k][0]);
  }

  // get the prediction
  // i think it will get an array of 10 elements
  let ans = nn.predict(data[k][0]);

  // see which element has the highest value
  let max = ans[0];
  // and keep track of its index ( corresponding to the digit )
  let idx = 0;

  // and see if there's an element with a higher value
  for (let i = 1; i < ans.length; i++) {
    // if so, update the max and the index
    if (max < ans[i]) {
      max = ans[i];
      idx = i;
    }
  }

  // and return the index ( the digit or label, however you wanna call it )
  return idx;
}
