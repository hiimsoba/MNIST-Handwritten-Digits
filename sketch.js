// the neural network
let nn;

// buttons!
let guessButton;
let resetButton;

// training, testing data and labels and sets and a lot of other stuff
let trainData;
let trainLabels;

let testData;
let testLabels;

let trainSet;
let testSet;

function setup() {
  // create a 600x600 canvas
  createCanvas(600, 600);

  // empty paragraph to have the button under the canvas
  createP('');

  // create the neural network
  // 784 input nodes ( because it takes 28x28 images as inputs ), 16 hidden nodes and 10 output nodes
  nn = new NeuralNetwork(784, 16, 10);

  // create the buttons
  guessButton = createButton("Guess my digit!");
  resetButton = createButton("Reset the background!");

  // link functions to the mouse pressed event of the buttons
  guessButton.mousePressed(guessDigit);
  resetButton.mousePressed(() => {
    background(0);
  });

  // black background
  background(0);
}
