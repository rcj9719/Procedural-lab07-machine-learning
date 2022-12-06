// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;

// TODO: Upate your model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/s-e818tEu/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let peek_img;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  
  peek_img = createImg("https://previews.123rf.com/images/vineethapadimiti/vineethapadimiti1310/vineethapadimiti131000010/23102728-holi-splash.jpg");
  peek_img.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  
  // TODO: Custom logic based on labels
  if (label === "Class 2") {
    text("Hold!", width / 2, height - 4);
  } else if (label === "Class 1") {
    image(peek_img, 0, 0, peek_img.width*0.5, peek_img.height*0.5);
    fill(255, 0, 0);
    text("Splash!", width / 2, height - 4);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}