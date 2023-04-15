const dragBox = document.querySelector("#drag-box")

let coords = {}
let dragging = false

document.querySelector('canvas').addEventListener("mousedown", e => {
    dragging = true
    coords.x = e.clientX;
    coords.y = e.clientY;
})

document.querySelector("canvas").addEventListener("mousemove", (e) => {
if (!dragging || e.clientX < 0 || e.clientY < 0) return;
  const { clientX, clientY } = e;
  const { x, y } = coords;
  const width = clientX - x;
  const height = clientY - y;

  if (dragBox.style.opacity !== "1") {
    dragBox.style.opacity = 0.4;
  }

  if (width < 0) {
    dragBox.style.left = clientX + "px";
    dragBox.style.width = Math.abs(width)  + "px";
  } else {
    dragBox.style.left = x + "px";
    dragBox.style.width = width + "px";
  }

  if (height < 0) {
    dragBox.style.top = clientY + "px";
    dragBox.style.height = Math.abs(height) + "px";
  } else {
    dragBox.style.top = y + "px";
    dragBox.style.height = height + "px";
  }
  
})

dragBox.addEventListener("mouseup",(e) => {
  // console.log(e,'mouseup event')
    dragging = false
    // console.log(dragBox)
    // console.log(dragBox.getBoundingClientRect())

    const xStart = coords.x
    const yStart = coords.y
    const xEnd = e.clientX;
    const yEnd = e.clientY;

    

   

    shapes.forEach((shape) => {
      console.log(
        `xShape: ${shape.x + shape.width}`,
        `yShape: ${shape.y + shape.height}`,
        `xStart: ${xStart}`,
        `xEnd: ${xEnd}`,
        `yStart: ${yStart}`,
        `yEnd: ${yEnd}`

      )
     const shapeTop = shape.y;
     const shapeBottom=  shape.y + shape.height;
     const shapeLeft = shape.x;
     const shapeRight = shape.x + shape.width

    //  console.log(shape)

      let toBottomRight =  false
      let toBottomLeft = false;
      let toTopLeft = false;
      let toTopRight = false

      if (xStart < shapeRight && xEnd > shapeLeft && yStart < shapeBottom && yEnd > shapeTop) {
        toBottomRight = true
      }
      if (xStart < shapeRight && xEnd > shapeLeft && yStart > shapeTop && yEnd < shapeBottom) {
        toTopRight = true
      }

      if (xStart > shapeLeft && xEnd < shapeRight && yStart < shapeBottom && yEnd > shapeTop) {
        toBottomLeft = true
      }
      if (xStart > shapeLeft && xEnd < shapeRight && yStart > shapeTop && yEnd < shapeBottom) {
        toTopLeft = true
      }
    
      
      if (toBottomLeft || toBottomRight || toTopLeft || toTopRight) {
        console.log(shape)
      }

    })
    dragBox.style.opacity = 0;
    dragBox.style.width = 0;
    dragBox.style.height = 0;
    // console.log(dragBox.getBoundingClientRect())
    // dragBox.style.display = 'none'




})

// get canvas related references
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// an array of objects that define different shapes
const shapes = [];
// define 2 rectangles
shapes.push({
  x: 10,
  y: 100,
  width: 30,
  height: 30,
  fill: "#444444",
  isDragging: false
});
shapes.push({
  x: 80,
  y: 100,
  width: 30,
  height: 30,
  fill: "#ff550d",
  isDragging: false
});
// define 2 circles
// shapes.push({ x: 150, y: 100, r: 10, fill: "#800080", isDragging: false });
// shapes.push({ x: 200, y: 100, r: 10, fill: "#0c64e8", isDragging: false });

draw();

// draw a single rect
function rect(r) {
  ctx.fillStyle = r.fill;
  ctx.fillRect(r.x, r.y, r.width, r.height);
}

// draw a single rect
function circle(c) {
  ctx.fillStyle = c.fill;
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// redraw the scene
function draw() {
  // redraw each shape in the shapes[] array
  for (let i = 0; i < shapes.length; i++) {
    // decide if the shape is a rect or circle
    // (it's a rect if it has a width property)
    if (shapes[i].width) {
      rect(shapes[i]);
    } else {
      // circle(shapes[i]);
    }
  }
}
