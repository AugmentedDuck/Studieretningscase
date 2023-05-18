let stepLength = 0.0001 //Number of seconds to jump forwards each calculation
let blackHoleSize = 25 //The radius of the balck hole
let numberOfSteps = 142 //Number of calculations
let lineIndex = 0; //Animation frame number
let astronautStartDistance = 1000
let startTime = 0
let outsideCoordinateSets
let insideCoordinateSets

const speedOfLight = 299792
const waitFrames = 30 //How many frames before animation restarts

function setup() {
  createCanvas(windowWidth, windowHeight);

  insideCoordinateSets = calculateCoordinates(true)
  outsideCoordinateSets = calculateCoordinates(false)

  frameRate(60) //Animation speed
  background(220);
  textSize(40)
}

function draw() {
  if (lineIndex > outsideCoordinateSets.length + waitFrames) { //Restart animation
    lineIndex = 0
    background(220);
  } else if (lineIndex >= 0 && lineIndex < outsideCoordinateSets.length - 1) {
    //From calculation coordinates to screen
    const heightUnit = height / astronautStartDistance 
    const widthUnit = width / (numberOfSteps * stepLength)

    //For the outside perspective
    //Get screen coordinates
    let x11 = outsideCoordinateSets[lineIndex][0] * widthUnit
    let y11 = abs(outsideCoordinateSets[lineIndex][1] * heightUnit - height) //Adjust y-axis
    let x12 = outsideCoordinateSets[lineIndex + 1][0] * widthUnit
    let y12 = abs(outsideCoordinateSets[lineIndex + 1][1] * heightUnit - height) //Adjust y-axis

    //Draw the line
    stroke("red")
    fill("red")
    text("Outsider", width / 2, height / 2 - height / 6)
    line(x11, y11, x12, y12)

    //Repeat for astronauts perspective
    let x21 = insideCoordinateSets[lineIndex][0] * widthUnit
    let y21 = abs(insideCoordinateSets[lineIndex][1] * heightUnit - height)
    let x22 = insideCoordinateSets[lineIndex + 1][0] * widthUnit
    let y22 = abs(insideCoordinateSets[lineIndex + 1][1] * heightUnit - height)

    stroke("green")
    fill("green")
    text("Astronaut", width / 2, height / 2)
    line(x21, y21, x22, y22)
  }
  lineIndex++; //Next frame
}

function calculateCoordinates(isAstronaut) {
  let time = startTime
  let astronautDistance = astronautStartDistance
  let derivative
  const coordinateSets = []

  coordinateSets[0] = [time, astronautDistance] //Starting coordinates

  //Eulers method for numerically estimating differential equations
  for (let i = 1; i < numberOfSteps; i++) {
    //Outside or astronauts perspective?
    if (isAstronaut) {
      derivative = -speedOfLight * sqrt(blackHoleSize / astronautDistance);
    } else {
      derivative = -speedOfLight * (1 - (blackHoleSize / astronautDistance)) * sqrt(blackHoleSize / astronautDistance);
    }

    time += stepLength;
    astronautDistance += derivative * stepLength;

    coordinateSets[i] = [time, astronautDistance]
  }

  return coordinateSets
}