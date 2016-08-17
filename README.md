scroll_to
=======

easing scroll to function

```javasctipt
var scrollTo = require("@nathanfaucett/scroll_to");


var cancel = scrollTo(
      window.scrollX,      // start x
      window.scrollY,      // start y
      div.offsetLeft,      // end y
      div.offsetTop,       // end y
      1000,                // duration
      easing.inOutQuad,    // easing function
      window.scrollTo,     // scroll to function
      function onScrollTo() {
          console.log("DONE");
      }
  );
```
