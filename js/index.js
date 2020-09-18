
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


function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = 5;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
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
            // 开启橡皮擦功能
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
                context.clearRect(x, y, 10 -5, 10-5);
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

        canvas.onmousedown = function (event) {
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

var  canvas = document.getElementById("canvas");
var  context = canvas.getContext("2d");
// 橡皮功能开启
var usingEraser = false;
var using = false;
var lastPoint = {
    x: undefined,
    y: undefined
}
pen.onclick = function(){
    usingEraser = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
};
let eraser = document.getElementById('eraser');
eraser.onclick = function(){
    usingEraser = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
    console.log("点击了橡皮擦!");
}


green.onclick = function(){
    context.strokeStyle = 'green'
    blue.classList.remove("active");
    red.classList.remove("active");
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    red.classList.remove("active");
    green.classList.remove("active");
}
red.onclick = function(){
    context.strokeStyle = 'red'
    blue.classList.remove("active");
    green.classList.remove("active");
}
setCanvasHeight();
listenToUsers();
