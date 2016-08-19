var easing = require("@nathanfaucett/easing"),
    domDimensions = require("@nathanfaucett/dom_dimensions"),
    scrollTo = require("../..");


var innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;


function createElements() {
    var parentDiv = document.createElement("div"),
        div = document.createElement("div"),
        width = innerWidth,
        height = innerHeight;

    parentDiv.id = "target-parent";
    parentDiv.style.width = (width * 3) + "px";
    parentDiv.style.height = (height * 3) + "px";

    div.id = "target";
    div.style.position = "absolute";
    div.style.width = 128 + "px";
    div.style.height = 128 + "px";
    div.style.left = ((width * 2) - 128) + "px";
    div.style.top = ((height * 2) - 128) + "px";
    div.style.background = "#000";

    parentDiv.appendChild(div);
    document.body.appendChild(parentDiv);
}

function scroll() {
    var div = document.getElementById("target"),
        documentElement = document.documentElement || document.body;

    return scrollTo(
        window.pageXOffset || (documentElement.scrollLeft - documentElement.clientLeft),
        window.pageYOffset || (documentElement.scrollTop - documentElement.clientTop),
        domDimensions.left(div),
        domDimensions.top(div),
        1000,
        easing.inOutQuad,
        window.scrollTo,
        function onScrollTo() {
            console.log("DONE");
        }
    );
}

function runTest() {
    createElements();
    return scroll();
}

function run(startX, startY) {
    window.scrollTo(startX, startY);
    setTimeout(runTest, 50/3);
}

run(0, 0);


window.run = run;
