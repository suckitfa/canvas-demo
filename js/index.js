var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lineWidth = 5;

autoSetCanvasSize(canvas);
listenToUsers();
//监听浏览器的窗口的宽，

//设置画布的宽,高
function autoSetCanvasSize(canvas) {
    setCanvasSize()
  
    window.onresize = function() {
      setCanvasSize()
    }
  
    function setCanvasSize() {
      var pageWidth = document.documentElement.clientWidth
      var pageHeight = document.documentElement.clientHeight
  
      canvas.width = pageWidth
      canvas.height = pageHeight
    }
  }


function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}
//特性检测：并不关心设备，只关心是够支持该功能
function listenToUsers() {

    if (document.body.ontouchstart !== undefined) {
        //说明是触屏设备
        canvas.ontouchstart = function (event) {
            using = true;
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            // console.log(`x=${x}y=${y}`);
            if (usingEraser) { //开启
                if (using) {
                    context.clearRect(x - 5, y - 5, 10, 10);
                }
            } else { //没有开启橡皮擦的功能，就是在作画
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }

        canvas.ontouchmove = function (event) {
            console.log("边摸遍动");
            let x = event.touches[0].clientX;
            let y = event.touches[0].clientY;
            // console.log(`x=${x}y=${y}`);
            if (!using) return;
            // 开启橡皮擦功能
            if (usingEraser) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);

                //更新现在的最后一个点!!!!
                lastPoint = newPoint;
            }
        }

        canvas.ontouchend = function () {
            console.log("摸完了！");
            using = false;
        }

    } else {
        //非触屏设备
        canvas.onmousemove = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            using = true;
            if (usingEraser) {
                context.clearRect(x - 5, y - 5, 10, 10);
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);

                //更新现在的最后一个点!!!!
                lastPoint = newPoint;
            }
        }

        canvas.onmousedown = function (event) {
            var x = event.clientX;
            var y = event.clientY;
            using = true;
            if (usingEraser) { //开启
                if (using) {
                    context.clearRect(x - 5, y - 5, 10, 10);
                }
            } else { //没有开启橡皮擦的功能，就是在作画
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


// 橡皮功能开启
var usingEraser = false;
var using = false;
var lastPoint = {
    x: undefined,
    y: undefined
}

thin.onclick = function () {
    lineWidth = 5;
}
thick.onclick = function () {
    lineWidth = 10;
}
pen.onclick = function () {
    usingEraser = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
};
let eraser = document.getElementById('eraser');
eraser.onclick = function () {
    usingEraser = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
    console.log("点击了橡皮擦!");
}


green.onclick = function () {
    context.strokeStyle = 'green'
    blue.classList.remove("active");
    red.classList.remove("active");
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    red.classList.remove("active");
    green.classList.remove("active");
}
red.onclick = function () {
    context.strokeStyle = 'red'
    blue.classList.remove("active");
    green.classList.remove("active");
}
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
