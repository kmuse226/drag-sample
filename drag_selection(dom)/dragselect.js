const dragBox = document.getElementById("drag-box");
const content = document.getElementById("content");
const contentChildren = [...content.children];
const coords = { x: null, y: null };

let dragging;

function resizeDragBox(e) {
  if (!dragging || e.clientX < 0 || e.clientY < 0) return;

  const { clientX, clientY } = e;
  const { x, y } = coords;
  const width = clientX - x;
  const height = clientY - y;

  if (dragBox.style.opacity !== "1") {
    dragBox.style.opacity = "1";
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
}

function detectSelection() {
  const dragRect = dragBox.getBoundingClientRect();

  if (
    !dragging ||
    !dragRect.left ||
    !dragRect.top ||
    !dragRect.bottom ||
    !dragRect.right
  )
    return;

  contentChildren.forEach((box) => {
    const boxClassList = [...box.classList];

    if (!boxClassList.includes("select-box")) return;

    const boxRect = box.getBoundingClientRect();

    const toBottomRight =
      coords.x < boxRect.right &&
      coords.y < boxRect.bottom &&
      dragRect.right > boxRect.left &&
      dragRect.bottom > boxRect.top;

    const toBottomLeft =
      coords.x > boxRect.left &&
      coords.y < boxRect.bottom &&
      dragRect.left < boxRect.right &&
      dragRect.bottom > boxRect.top;

    const toTopLeft =
      coords.x > boxRect.left &&
      coords.y > boxRect.bottom &&
      dragRect.left < boxRect.right &&
      dragRect.top < boxRect.bottom;

    const toTopRight =
      coords.x < boxRect.right &&
      coords.y > boxRect.bottom &&
      dragRect.right > boxRect.left &&
      dragRect.top < boxRect.bottom;

    if (toBottomRight || toBottomLeft || toTopLeft || toTopRight) {
      box.classList.add("selected");
      
    } else box.classList.remove("selected");
  });
}

function mouseMoveHandler(e) {
  resizeDragBox(e);
  detectSelection();
}

function mouseDownHandler(e) {
  dragging = true;
  coords.x = e.clientX;
  coords.y = e.clientY;

  contentChildren.forEach((box) => {
    const boxClassList = [...box.classList];

    if (!boxClassList.includes("select-box")) return;

    box.classList.remove("selected");
  });
}

function mouseUpHandler() {
  dragging = false;
  console.log(Array.from(document.querySelectorAll('.selected')).map(box => box.getBoundingClientRect()))
  dragBox.removeAttribute("style");
}

document.addEventListener("mousedown", mouseDownHandler);
document.addEventListener("mousemove", mouseMoveHandler);
document.addEventListener("mouseup", mouseUpHandler);