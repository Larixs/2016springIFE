function getBy(type,str) {
  switch (type){
    case "id":
      return document.getElementById(str);
    case "tag":
      return document.getElementsByTagName(str);
    case "class":
      return document.getElementsByClassName(str);
    default:
      return null;
  }
}

var btn = getBy("tag","button")[0];

var root = getBy("id","root");

var divList = [];

var timer = null;


(function () {
  btn.addEventListener("click",function () {
    loop(root);
    changeColor();
  })
}());

function loop(root) {
  if(root!==null){
    divList.push(root);
    loop(root.lastElementChild);
    loop(root.firstElementChild);

  }
}
function changeColor() {
  var i = 0;
  var divListLen = divList.length;
  divList[i].classList.add("show");
  timer = setInterval(function () {
    i++;
    if( i < divListLen ){
      divList[i].classList.add("show");
      divList[i-1].classList.remove("show");
    }else{
      clearInterval(timer);
      divList[i-1].classList.remove("show");
    }
  },500)
}


