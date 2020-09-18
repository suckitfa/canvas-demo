
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
setCanvasHeight();
//监听浏览器的窗口的宽，高
window.onresize = function () {
    setCanvasHeight();
}

//设置画布的宽,高
function setCanvasHeight() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();
}


function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    // context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
var using = false;
var lastPoint = {
    x: undefined,
    y: undefined
}
//特性检测：并不关心设备，只关心是够支持该功能
function listenToUsers() {
    if (document.body.ontouchstart !== undefined) {
        //说明是触屏设备
        canvas.ontouchstart = function (event) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            if (usingEraser) { //开启
                if (using) {
                    context.clearRect(x, y, 10 - 5, 10 - 5);
                }
            } else { //没有开启橡皮擦的功能，就是在作画
                using = true;
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function (event) {
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            if (usingEraser) {
                using = true;
                context.clearRect(x, y, 10 - 5, 10 - 5);
            } else {
                if (using) {
                    var newPoint = {
                        "x": x,
                        "y": y
                    };
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);

                    //更新现在的最后一个点!!!!
                    lastPoint = newPoint;
                }
            }
        }
        canvas.ontouchend = function () {
            using = false;
        }
    } else {
        //非触屏设备
        canvas.onmousemove = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            if (usingEraser) {
                using = true;
                context.clearRect(x, y, 10 - 5, 10 - 5);
            } else {
                if (using) {
                    var newPoint = {
                        "x": x,
                        "y": y
                    };
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);

                    //更新现在的最后一个点!!!!
                    lastPoint = newPoint;
                }
            }
        }

        canvas.onmousedown = function () {
            var x = event.clientX;
            var y = event.clientY;

            if (usingEraser) { //开启
                if (using) {
                    context.clearRect(x, y, 10 - 5, 10 - 5);
                }
            } else { //没有开启橡皮擦的功能，就是在作画
                using = true;
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmouseup = function () {
            using = false;
        }
    }
}


// 橡皮差功能开启
var usingEraser = false;
eraser.onclick = function () {
    //点击两次就会取得相同的结果
    usingEraser = !usingEraser;
}
listenToUsers();
