// let the user draw stuff to the canvas
// basically draws lines from previous position of the mouse to the current position of the mouse
function mouseDragged() {
  strokeWeight(38);
  stroke(255);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

// guesses the image that the user provides
function guessDigit() {
  // gets the input array from the canvas
  let input = prepImage();

  // print the image to the canvas, after it's been processed
  printImage(input);

  // make the network predict a digit
  let ans = nn.predict(input);

  // assign a digit to each value, so we can sort it afterwards and still have the pairs
  for (let i = 0; i < ans.length; i++) {
    ans[i] = [ans[i], i];
  }

  // sort the answer array
  // bubble sort, best kind of sort
  // it's just 10 elements anyway
  for (let i = 0; i < ans.length - 1; i++) {
    for (let j = i + 1; j < ans.length; j++) {
      if (ans[i][0] < ans[j][0]) {
        let aux = ans[i];
        ans[i] = ans[j];
        ans[j] = aux;
      }
    }
  }

  // and now print the results
  // first, the highest value in the answer array
  console.log("The neural network believes it's a " + ans[0][1]);
  // and then, the 2nd, 3rd and 4th guesses... maybe.
  console.log("It could also be a " + ans[1][1] + ", a " + ans[2][1] + " or a " + ans[3][1] + ".");
}

// gets a 784-element array consisting of the pixels from the image drawn by the user
function prepImage() {
  // load pixels from the canvas
  loadPixels();
  // create an image that's width x height
  let img = createImage(width, height);
  // get all the pixels from the canvas
  img = get(0, 0, width, height);
  // resize it to be 28x28
  img.resize(28, 28);
  // load its pixels
  img.loadPixels();
  // result array
  let res = [];
  // for each pixel, grab its value, NORMALIZE IT ( i forgot to do this before... oof ) and insert it in the result array
  for (let i = 0; i < img.pixels.length; i += 4) {
    res.push(img.pixels[i] / 255);
  }
  // and return the resutl
  return res;
}
