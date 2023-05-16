let stepLength = 0.0001
let blackHoleSize = 25
let numberOfSteps = 142
let lineIndex = 0;
let astronautStartDistance = 1000
let startTime = 0

const speedOfLight = 299792
const outsideCoordinateSets = []
const insideCoordinateSets = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  let time = startTime
  let astronautDistance = astronautStartDistance

  outsideCoordinateSets[0] = [time, astronautDistance]
  insideCoordinateSets[0] = [time, astronautDistance]


  for (let i = 1; i < numberOfSteps; i++) {
    let derivative = -speedOfLight * (1 - (blackHoleSize / astronautDistance)) * sqrt(blackHoleSize / astronautDistance);
    
    time += stepLength;
    astronautDistance += derivative * stepLength;

    outsideCoordinateSets[i] = [time, astronautDistance]
  }

  time = startTime
  astronautDistance = astronautStartDistance

  for (let i = 1; i < numberOfSteps; i++) {
    let derivative = -speedOfLight * sqrt(blackHoleSize / astronautDistance);
    
    time += stepLength;
    astronautDistance += derivative * stepLength;

    insideCoordinateSets[i] = [time, astronautDistance]
  }
  console.log(insideCoordinateSets)
  frameRate(60)
  background(220);

}

function draw() {
  if(lineIndex > outsideCoordinateSets.length + 30) {
    lineIndex = 0
    background(220);
  } else if (lineIndex >= 0 && lineIndex < outsideCoordinateSets.length - 1) {
    const heightUnit = height / astronautStartDistance
    const widthUnit = width / (numberOfSteps * stepLength)
  
    let x11 = outsideCoordinateSets[lineIndex][0] * widthUnit
    let y11 = abs(outsideCoordinateSets[lineIndex][1] * heightUnit - height)
    let x12 = outsideCoordinateSets[lineIndex + 1][0] * widthUnit
    let y12 = abs(outsideCoordinateSets[lineIndex + 1][1] * heightUnit - height)
    
    stroke("red")
    line(x11, y11, x12, y12)
  
    let x21 = insideCoordinateSets[lineIndex][0] * widthUnit
    let y21 = abs(insideCoordinateSets[lineIndex][1] * heightUnit - height)
    let x22 = insideCoordinateSets[lineIndex + 1][0] * widthUnit
    let y22 = abs(insideCoordinateSets[lineIndex + 1][1] * heightUnit - height)
  
    stroke("green")
    line(x21, y21, x22, y22)
  }
  lineIndex++;
}