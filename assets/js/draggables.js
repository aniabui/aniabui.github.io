window.addEventListener('load', function () {
    document.querySelectorAll('.info-draggable').forEach(draggable => {
      enableDragging(draggable);
    });
})

function enableDragging(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    var height = (element.offsetTop - pos2);
    element.style.top = Math.max(0, Math.min(height, document.body.clientHeight - element.height)) + "px";
    var width = (element.offsetLeft - pos1);
    element.style.left = (Math.max(0, Math.min(width , document.body.clientWidth - element.width))) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

