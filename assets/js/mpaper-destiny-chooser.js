function mpaper_destiny_chooser(newId, oldId) {
  var newButton = document.getElementById(newId);
  var oldButton = document.getElementById(oldId);
  // Clean background color of the new ID.
  oldButton.style.background = 0;
  // Set background color of the old ID to white.
  newButton.style.background = null;
  // Hide rows associated with the old ID.
  var oldElements = document.getElementsByClassName(oldId);
  for (var i = 0; i < oldElements.length; i++) {
    oldElements.item(i).classList.add("hidden");
  }
  // Display rows associated with the new ID.
  var newElements = document.getElementsByClassName(newId);
  for (var i = 0; i < newElements.length; i++) {
    newElements.item(i).classList.remove("hidden");
  }
}
