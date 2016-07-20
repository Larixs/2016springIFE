var cube = document.getElementById("cube");
var direction = 0;
var borderStyle = "6px solid #3c3c3c";

function moveCube(cube,keyCode) {
  switch (keyCode){
    case 37:
      direction += 90 ;
      direction %= 360;
      changeDirection(cube,direction);
      break;
    case 38:
      direction %= 360;
      move(cube,direction);
      break;
    case 39:
      direction -= 90 ;
      direction += 360;
      direction %= 360;
      changeDirection(cube,direction);
      break;
    case 40:
      direction += 180;
      direction %= 360;
      changeDirection(cube,direction);
      break;
    default:
      break;
  }
}
function move(cube,direction) {
  var top = cube.offsetTop;
  var left = cube.offsetLeft;
  if(top%30||left%30)//如果处于动画中,top和left不为30的整数倍
  {
    return;
  }
  switch (direction){
    case 0:
      if(left<300){
        left += 30;
        cube.style.left = left + "px";
      }
      break;
    case 90:
      if(0<top){
      top -= 30;
      cube.style.top = top + "px";
    }
      break;
    case 180:
      if(left>30){
        left -= 30;
        cube.style.left = left + "px";
      }
      break;
    case 270:
      if(top<270){
        top += 30;
        cube.style.top = top + "px";
      }
      break;
    default:
      break;
  }
}
function changeDirection(cube,direction) {
  cube.style.borderRight = "1px";
  cube.style.borderLeft = "1px";
  cube.style.borderTop = "1px";
  cube.style.borderBottom = "1px";
  switch (direction){
    case 0:
      cube.style.borderRight = borderStyle;
      break;
    case 90:
      cube.style.borderTop = borderStyle;
      break;
    case 180:
      cube.style.borderLeft = borderStyle;
      break;
    case 270:
      cube.style.borderBottom = borderStyle;
      break;
    default:
      break;
  }
}
window.onkeydown = function (event) {
  if(event.keyCode<41&&event.keyCode>36){
    moveCube(cube,event.keyCode);
    event.preventDefault();
  }
};

cube.style.borderRight="";
