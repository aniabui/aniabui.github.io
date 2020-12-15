aniabui = {
  colorscroll: {
    "0": {
      color: "black",
      pos_fn: function() { return 0; }
    },
    "1": {
      color: "white",
      pos_fn: function() { return 300; }
    },
    "2": {
      color: "white",
      pos_fn: function() { return document.body.scrollHeight - Math.max(document.getElementById("footer").clientHeight, window.innerHeight) - 300; }
    },
    "3": {
      color: "white",
      pos_fn: function() { return document.body.scrollHeight - Math.max(document.getElementById("footer").clientHeight, window.innerHeight); }
    }
  }
}
