var once = require("@nathanfaucett/once"),
    clamp = require("@nathanfaucett/clamp"),
    requestAnimationFrame = require("@nathanfaucett/request_animation_frame");


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

        currentX = clamp(easingFn(deltaX / totalDeltaX, deltaTime, startX, endX, duration), startX, endX);
        currentY = clamp(easingFn(deltaY / totalDeltaY, deltaTime, startY, endY, duration), startY, endY);

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
