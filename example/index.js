(function(dependencies, chunks, undefined, global) {
    
    var cache = [],
        cacheCallbacks = {};
    

    function Module() {
        this.id = null;
        this.filename = null;
        this.dirname = null;
        this.exports = {};
        this.loaded = false;
    }

    Module.prototype.require = require;

    function require(index) {
        var module = cache[index],
            callback, exports;

        if (module !== undefined) {
            return module.exports;
        } else {
            callback = dependencies[index];

            cache[index] = module = new Module();
            exports = module.exports;

            callback.call(exports, require, exports, module, undefined, global);
            module.loaded = true;

            return module.exports;
        }
    }

    require.resolve = function(path) {
        return path;
    };

    
    require.async = function async(index, callback) {
        var module = cache[index],
            callbacks, node;

        if (module) {
            callback(module.exports);
        } else if ((callbacks = cacheCallbacks[index])) {
            callbacks[callbacks.length] = callback;
        } else {
            node = document.createElement("script");
            callbacks = cacheCallbacks[index] = [callback];

            node.type = "text/javascript";
            node.charset = "utf-8";
            node.async = true;

            function onLoad() {
                var i = -1,
                    il = callbacks.length - 1;

                while (i++ < il) {
                    callbacks[i](require(index));
                }
                delete cacheCallbacks[index];
            }

            if (node.attachEvent && !(node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0)) {
                node.attachEvent("onreadystatechange", onLoad);
            } else {
                node.addEventListener("load", onLoad, false);
            }

            node.src = chunks[index];

            document.head.appendChild(node);
        }
    };

    global["CpxFb8DF-eIba-4itl-paWW-7e7LCoQSHhWM6"] = function(asyncDependencies) {
        var i = -1,
            il = asyncDependencies.length - 1,
            dependency, index;

        while (i++ < il) {
            dependency = asyncDependencies[i];
            index = dependency[0];

            if (dependencies[index] === null) {
                dependencies[index] = dependency[1];
            }
        }
    };

    

    if (typeof(define) === "function" && define.amd) {
        define([], function() {
            return require(0);
        });
    } else if (typeof(module) !== "undefined" && module.exports) {
        module.exports = require(0);
    } else {
        
        require(0);
        
    }
}([
function(require, exports, module, undefined, global) {
/*@=-/var/www/html/node/_animation/scroll_to/example/src/index.js-=@*/
var easing = require(1),
    domDimensions = require(2),
    scrollTo = require(3);


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

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/easing@0.0.1/src/index.js-=@*/
var isNullOrUndefined = require(4);


var easing = module.exports;


function inQuad(x, t, b, c, d) {
    return c * (t /= d) * t + b;
}

function outQuad(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function inOutQuad(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
}

easing.inQuad = inQuad;
easing.outQuad = outQuad;
easing.inOutQuad = inOutQuad;

function inCubic(x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
}

function outCubic(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function inOutCubic(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    } else {
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
}

easing.inCubic = inCubic;
easing.outCubic = outCubic;
easing.inOutCubic = inOutCubic;

function inQuart(x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function outQuart(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function inOutQuart(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    } else {
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }
}

easing.inQuart = inQuart;
easing.outQuart = outQuart;
easing.inOutQuart = inOutQuart;

function inQuint(x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}

function outQuint(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function inOutQuint(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    } else {
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }
}

easing.inQuint = inQuint;
easing.outQuint = outQuint;
easing.inOutQuint = inOutQuint;

function inSine(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

function outSine(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

function inOutSine(x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

easing.inSine = inSine;
easing.outSine = outSine;
easing.inOutSine = inOutSine;

function inExpo(x, t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}

function outExpo(x, t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
}

function inOutExpo(x, t, b, c, d) {
    if (t === 0) {
        return b;
    } else if (t === d) {
        return b + c;
    } else if ((t /= d / 2) < 1) {
        return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    } else {
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
}

easing.inExpo = inExpo;
easing.outExpo = outExpo;
easing.inOutExpo = inOutExpo;

function inCircle(x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

function outCircle(x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}

function inOutCircle(x, t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    } else {
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
}

easing.inCircle = inCircle;
easing.outCircle = outCircle;
easing.inOutCircle = inOutCircle;

function inElastic(x, t, b, c, d) {
    var s = 1.70158,
        p = 0,
        a = c;

    if (t === 0) {
        return b;
    } else if ((t /= d) === 1) {
        return b + c;
    } else {
        if (!p) {
            p = d * 0.3;
        }

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
}

function outElastic(x, t, b, c, d) {
    var s = 1.70158,
        p = 0,
        a = c;

    if (t === 0) {
        return b;
    } else if ((t /= d) === 1) {
        return b + c;
    } else {
        if (!p) {
            p = d * 0.3;
        }

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
}

function inOutElastic(x, t, b, c, d) {
    var s = 1.70158,
        p = 0,
        a = c;

    if (t === 0) {
        return b;
    } else if ((t /= d / 2) === 2) {
        return b + c;
    } else {
        if (!p) {
            p = d * (0.3 * 1.5);
        }

        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        } else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }

        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }

        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
}

easing.inElastic = inElastic;
easing.outElastic = outElastic;
easing.inOutElastic = inOutElastic;

function inBack(x, t, b, c, d, s) {
    if (isNullOrUndefined(s)) {
        s = 1.70158;
    } else {
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
}

function outBack(x, t, b, c, d, s) {
    if (isNullOrUndefined(s)) {
        s = 1.70158;
    } else {
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }
}

function inOutBack(x, t, b, c, d, s) {
    if (isNullOrUndefined(s)) {
        s = 1.70158;
    } else if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    } else {
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
}

easing.inBack = inBack;
easing.outBack = outBack;
easing.inOutBack = inOutBack;

function inBounce(x, t, b, c, d) {
    return c - outBounce(x, d - t, 0, c, d) + b;
}

function outBounce(x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
}

function inOutBounce(x, t, b, c, d) {
    if (t < d / 2) {
        return inBounce(x, t * 2, 0, c, d) * 0.5 + b;
    } else {
        return outBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
}

easing.inBounce = inBounce;
easing.outBounce = outBounce;
easing.inOutBounce = inOutBounce;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/dom_dimensions@0.0.1/src/index.js-=@*/
var getCurrentStyle = require(7),
    isElement = require(8);


module.exports = domDimensions;


function domDimensions(node) {
    var dimensions = new Dimensions(),
        clientRect;

    if (isElement(node)) {
        clientRect = node.getBoundingClientRect();

        dimensions.top = clientRect.top;
        dimensions.right = clientRect.left + node.offsetWidth;
        dimensions.bottom = clientRect.top + node.offsetHeight;
        dimensions.left = clientRect.left;
        dimensions.width = dimensions.right - dimensions.left;
        dimensions.height = dimensions.bottom - dimensions.top;

        return dimensions;
    } else {
        return dimensions;
    }
}

function Dimensions() {
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
}

domDimensions.top = function(node) {
    if (isElement(node)) {
        return node.getBoundingClientRect().top;
    } else {
        return 0;
    }
};

domDimensions.right = function(node) {
    if (isElement(node)) {
        return domDimensions.left(node) + node.offsetWidth;
    } else {
        return 0;
    }
};

domDimensions.bottom = function(node) {
    if (isElement(node)) {
        return domDimensions.top(node) + node.offsetHeight;
    } else {
        return 0;
    }
};

domDimensions.left = function(node) {
    if (isElement(node)) {
        return node.getBoundingClientRect().left;
    } else {
        return 0;
    }
};

domDimensions.width = function(node) {
    if (isElement(node)) {
        return domDimensions.right(node) - domDimensions.left(node);
    } else {
        return 0;
    }
};

domDimensions.height = function(node) {
    if (isElement(node)) {
        return domDimensions.bottom(node) - domDimensions.top(node);
    } else {
        return 0;
    }
};

domDimensions.marginTop = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginTop"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginRight = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginRight"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginBottom = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginRight"), 10);
    } else {
        return 0;
    }
};

domDimensions.marginLeft = function(node) {
    if (isElement(node)) {
        return parseInt(getCurrentStyle(node, "marginLeft"), 10);
    } else {
        return 0;
    }
};

domDimensions.outerWidth = function(node) {
    if (isElement(node)) {
        return domDimensions.width(node) + domDimensions.marginLeft(node) + domDimensions.marginRight(node);
    } else {
        return 0;
    }
};

domDimensions.outerHeight = function(node) {
    if (isElement(node)) {
        return domDimensions.height(node) + domDimensions.marginTop(node) + domDimensions.marginBottom(node);
    } else {
        return 0;
    }
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/scroll_to@0.0.3/src/index.js-=@*/
var once = require(18),
    requestAnimationFrame = require(19);


module.exports = scrollTo;


function scrollTo(startX, startY, endX, endY, duration, easingFn, scrollToFn, callback) {
    var id = null,
        totalDeltaX = endX - startX,
        totalDeltaY = endY - startY,
        currentX = startX,
        currentY = startY,
        startTime = 0,
        deltaTime = 0;

    callback = once(callback);

    function scroll(ms) {
        var deltaX = startX - currentX,
            deltaY = startY - currentY;

        startTime = startTime || ms;
        deltaTime = ms - startTime;

        currentX = easingFn(deltaX / totalDeltaX, deltaTime, startX, endX, duration);
        currentY = easingFn(deltaY / totalDeltaY, deltaTime, startY, endY, duration);

        if (deltaTime < duration) {
            scrollToFn(currentX, currentY);
            id = requestAnimationFrame(scroll);
        } else {
            cancel();
        }
    }

    function cancel() {
        requestAnimationFrame.cancel(id);
        id = null;
        callback();
    }

    id = requestAnimationFrame(scroll);

    return cancel;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null_or_undefined@0.0.1/src/index.js-=@*/
var isNull = require(5),
    isUndefined = require(6);


module.exports = isNullOrUndefined;

/**
  isNullOrUndefined accepts any value and returns true
  if the value is null or undefined. For all other values
  false is returned.
  
  @param {Any}        any value to test
  @returns {Boolean}  the boolean result of testing value

  @example
    isNullOrUndefined(null);   // returns true
    isNullOrUndefined(undefined);   // returns true
    isNullOrUndefined("string");    // returns false
**/
function isNullOrUndefined(value) {
    return isNull(value) || isUndefined(value);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_null@0.0.1/src/index.js-=@*/
module.exports = isNull;


function isNull(value) {
    return value === null;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_undefined@0.0.1/src/index.js-=@*/
module.exports = isUndefined;


function isUndefined(value) {
    return value === void(0);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/get_current_style@0.0.1/src/index.js-=@*/
var supports = require(9),
    environment = require(10),
    isElement = require(8),
    isString = require(11),
    camelize = require(12);


var baseGetCurrentStyles;


module.exports = getCurrentStyle;


function getCurrentStyle(node, style) {
    if (isElement(node)) {
        if (isString(style)) {
            return baseGetCurrentStyles(node)[camelize(style)] || "";
        } else {
            return baseGetCurrentStyles(node);
        }
    } else {
        if (isString(style)) {
            return "";
        } else {
            return null;
        }
    }
}

if (supports.dom && environment.document.defaultView) {
    baseGetCurrentStyles = function(node) {
        return node.ownerDocument.defaultView.getComputedStyle(node, "");
    };
} else {
    baseGetCurrentStyles = function(node) {
        if (node.currentStyle) {
            return node.currentStyle;
        } else {
            return node.style;
        }
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_element@0.0.1/src/index.js-=@*/
var isNode = require(13);


module.exports = isElement;


function isElement(value) {
    return isNode(value) && value.nodeType === 1;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/supports@0.0.1/src/index.js-=@*/
var environment = require(10);


var supports = module.exports;


supports.dom = !!(typeof(window) !== "undefined" && window.document && window.document.createElement);
supports.workers = typeof(Worker) !== "undefined";

supports.eventListeners = supports.dom && !!environment.window.addEventListener;
supports.attachEvents = supports.dom && !!environment.window.attachEvent;

supports.viewport = supports.dom && !!environment.window.screen;
supports.touch = supports.dom && "ontouchstart" in environment.window;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/environment@0.0.1/src/index.js-=@*/
var environment = exports,

    hasWindow = typeof(window) !== "undefined",
    userAgent = hasWindow ? window.navigator.userAgent : "";


environment.worker = typeof(importScripts) !== "undefined";

environment.browser = environment.worker || !!(
    hasWindow &&
    typeof(navigator) !== "undefined" &&
    window.document
);

environment.node = !environment.worker && !environment.browser;

environment.mobile = environment.browser && /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

environment.window = (
    hasWindow ? window :
    typeof(global) !== "undefined" ? global :
    typeof(self) !== "undefined" ? self : {}
);

environment.pixelRatio = environment.window.devicePixelRatio || 1;

environment.document = typeof(document) !== "undefined" ? document : {};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_string@0.0.1/src/index.js-=@*/
module.exports = isString;


function isString(value) {
    return typeof(value) === "string" || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/camelize@0.0.1/src/index.js-=@*/
var reInflect = require(16),
    capitalizeString = require(17);


module.exports = camelize;


function camelize(string, lowFirstLetter) {
    var parts, part, i, il;

    lowFirstLetter = lowFirstLetter !== false;
    parts = string.match(reInflect);
    i = lowFirstLetter ? 0 : -1;
    il = parts.length - 1;

    while (i++ < il) {
        parts[i] = capitalizeString(parts[i]);
    }

    if (lowFirstLetter && (part = parts[0])) {
        parts[0] = part.charAt(0).toLowerCase() + part.slice(1);
    }

    return parts.join("");
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_node@0.0.1/src/index.js-=@*/
var isString = require(11),
    isNullOrUndefined = require(4),
    isNumber = require(14),
    isFunction = require(15);


var isNode;


if (typeof(Node) !== "undefined" && isFunction(Node)) {
    isNode = function isNode(value) {
        return value instanceof Node;
    };
} else {
    isNode = function isNode(value) {
        return (!isNullOrUndefined(value) &&
            isNumber(value.nodeType) &&
            isString(value.nodeName)
        );
    };
}


module.exports = isNode;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_number@0.0.1/src/index.js-=@*/
module.exports = isNumber;


function isNumber(value) {
    return typeof(value) === "number" || false;
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/is_function@0.0.1/src/index.js-=@*/
var objectToString = Object.prototype.toString,
    isFunction;


if (objectToString.call(function() {}) === "[object Object]") {
    isFunction = function isFunction(value) {
        return value instanceof Function;
    };
} else if (typeof(/./) === "function" || (typeof(Uint8Array) !== "undefined" && typeof(Uint8Array) !== "function")) {
    isFunction = function isFunction(value) {
        return objectToString.call(value) === "[object Function]";
    };
} else {
    isFunction = function isFunction(value) {
        return typeof(value) === "function" || false;
    };
}


module.exports = isFunction;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/re_inflect@0.0.1/src/index.js-=@*/
module.exports = /[^A-Z-_ ]+|[A-Z][^A-Z-_ ]+|[^a-z-_ ]+/g;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/capitalize_string@0.0.1/src/index.js-=@*/
module.exports = capitalizeString;


function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/once@0.0.1/src/index.js-=@*/
var apply = require(20);


module.exports = once;


function once(fn, thisArg) {
    var called = false,
        value;

    return function onceFn() {
        if (called === false) {
            called = true;
            value = apply(fn, arguments, thisArg);
        }
        return value;
    };
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/request_animation_frame@0.0.2/src/index.js-=@*/
var environment = require(10),
    emptyFunction = require(21),
    now = require(22);


var window = environment.window,
    requestAnimationFrame, lastTime;


window.requestAnimationFrame = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
);

window.cancelRequestAnimationFrame = (
    window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||

    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||

    window.mozCancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||

    window.oCancelAnimationFrame ||
    window.oCancelRequestAnimationFrame ||

    window.msCancelAnimationFrame ||
    window.msCancelRequestAnimationFrame
);


if (window.requestAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(callback, element) {
        return window.requestAnimationFrame(callback, element);
    };
} else {
    lastTime = 0;

    requestAnimationFrame = function requestAnimationFrame(callback) {
        var current = now(),
            timeToCall = Math.max(0, 16 - (current - lastTime)),
            id = global.setTimeout(
                function runCallback() {
                    callback(current + timeToCall);
                },
                timeToCall
            );

        lastTime = current + timeToCall;
        return id;
    };
}


if (window.cancelRequestAnimationFrame && window.requestAnimationFrame) {
    requestAnimationFrame.cancel = function(id) {
        return window.cancelRequestAnimationFrame(id);
    };
} else {
    requestAnimationFrame.cancel = function(id) {
        return global.clearTimeout(id);
    };
}


requestAnimationFrame(emptyFunction);


module.exports = requestAnimationFrame;

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/apply@0.0.1/src/index.js-=@*/
var isNullOrUndefined = require(4);


module.exports = apply;


function apply(fn, args, thisArg) {
    if (isNullOrUndefined(thisArg)) {
        return applyNoThisArg(fn, args);
    } else {
        return applyThisArg(fn, args, thisArg);
    }
}

function applyNoThisArg(fn, args) {
    switch (args.length) {
        case 0:
            return fn();
        case 1:
            return fn(args[0]);
        case 2:
            return fn(args[0], args[1]);
        case 3:
            return fn(args[0], args[1], args[2]);
        case 4:
            return fn(args[0], args[1], args[2], args[3]);
        case 5:
            return fn(args[0], args[1], args[2], args[3], args[4]);
        default:
            return fn.apply(null, args);
    }
}

function applyThisArg(fn, args, thisArg) {
    switch (args.length) {
        case 0:
            return fn.call(thisArg);
        case 1:
            return fn.call(thisArg, args[0]);
        case 2:
            return fn.call(thisArg, args[0], args[1]);
        case 3:
            return fn.call(thisArg, args[0], args[1], args[2]);
        case 4:
            return fn.call(thisArg, args[0], args[1], args[2], args[3]);
        case 5:
            return fn.call(thisArg, args[0], args[1], args[2], args[3], args[4]);
        default:
            return fn.apply(thisArg, args);
    }
}

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/empty_function@0.0.1/src/index.js-=@*/
module.exports = emptyFunction;


function emptyFunction() {}

function makeEmptyFunction(value) {
    return function() {
        return value;
    };
}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() {
    return this;
};
emptyFunction.thatReturnsArgument = function(argument) {
    return argument;
};

},
function(require, exports, module, undefined, global) {
/*@=-@nathanfaucett/now@0.0.2/src/browser.js-=@*/
var Date_now = Date.now || function Date_now() {
        return (new Date()).getTime();
    },
    START_TIME = Date_now(),
    performance = global.performance || {};


function now() {
    return performance.now();
}

performance.now = (
    performance.now ||
    performance.webkitNow ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    function now() {
        return Date_now() - START_TIME;
    }
);

now.getStartTime = function getStartTime() {
    return START_TIME;
};

now.stamp = function stamp() {
    return START_TIME + now();
};


START_TIME -= now();


module.exports = now;

}], {}, void(0), (new Function("return this;"))()));
