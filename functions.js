// draws a 28x28 image to the canvas from the "data" provided, which is a 784 elements array, i believe
function printImage(data) {
  console.log(data);
  // creates the image, loads its pixels
  let img = createImage(28, 28);
  img.loadPixels();

  // keep track of the current pixel
  let index = 0;
  // for each pixel of the image
  for (let i = 0; i < img.pixels.length; i += 4) {
    // get the color of the current element from the data
    let elt = 255 * data[index++];
    // and set the R, G, B, A channels of the current pixel in the image to that value
    img.pixels[i + 0] = elt;
    img.pixels[i + 1] = elt;
    img.pixels[i + 2] = elt;
    img.pixels[i + 3] = elt;
  }
  // update the pixels
  img.updatePixels();
  // reset the background
  background(0);
  // resize the image to cover the whole canavs
  img.resize(width, height);
  // and draw it at the origin (0, 0)
  image(img, 0, 0);
}

// get the "target" array from a label
// it will be a 10 element array full with 0's, and a single 1 corresponding to the digit ( label ) given
function getTarget(num) {
  // empty
  let arr = [];
  // for each digit from 0 to 9
  for (let i = 0; i < 10; i++) {
    // if the current digit is the provided argument, add 1, otherwise add 0
    arr.push(num == i ? 1 : 0);
  }
  // return the target array
  return arr;
}

// uhm... i believe this is what the neural network gets as inputs?
// this is what happens if you comment the code 9 months after you write it
function getInput(i, data) {
  // so initially, an empty array
  let input = [];
  // and now, for each pixel ( 784 of them, don't forget, mate )
  for (let j = 0; j < PIXS; j++) {
    // get the corresponding value in the data array, which will be
    // i * PIXS ( an offset, to get the pixels of the current image ) + j, which is.. like.. the current pixel in the image
    // and divide by 255, to normalize it, so we get a value between 0 and 1
    input.push(data[i * PIXS + j] / 255);
  }
  // and return the input array, normalized... thing
  return input;
}

// use this to make pairs from the data that we load
// i.e. data - label pairs
function makeSet(data, labels) {
  // one big "set" array
  let set = [];
  // and for each label
  for (let i = 0; i < labels.length; i++) {
    // push in the set the input that the neural net will get
    // ( see? this is smart, i create the input after loading stuff so i don't do it 12312312 times each time i'm training the net. i'm a genius. )
    // and its label
    // i guess it would be cool to have the target array instead of the label, but yo, whatever... it works well enough for now
    set.push([getInput(i, data), labels[i]]);
  }
  // and return the thing now
  return set;
}
