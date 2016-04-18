/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
  '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

var show=document.getElementById("aqi-chart-wrap");
var citySelect=document.getElementById("city-select");


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "days"
};

function addHandler(element,type,handler)//兼容浏览器
{
  if(element.addEventListener)
  {
    element.addEventListener(type,handler,false);//DOM2级方法
  }else if(element.attachEvent())
  {
    element.attachEvent("on"+type,handler)//兼容ie
  }else{
    element["on"+type]=handler;//DOM0级方法
  }
}
function getEvent(event)
{
  return event?event:window.event;
}
function getTarget(event){
  return event.target||event.srcElement;
}
function getTitle() {
  switch (pageState.nowGraTime) {
    case "days":
      return "每日";
    case "weeks":
      return "周平均";
    case "months":
      return "月平均";
  }
}
function getWidth(width, len) {
  var posObj = {};
  posObj.width = Math.floor(width / (len*2));
  posObj.left = Math.floor(width / len);
  posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
  return posObj;
}
function getHintLeft(posObj, i){
  if (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 60 <= 0) {
    return 5;
  } else if (posObj.left * i + posObj.offsetLeft + posObj.width / 2 + 60 >= 1200) {
    return (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 110);
  } else  {
    return (posObj.left * i + posObj.offsetLeft + posObj.width / 2 - 60);
  }
}
/**
 * 渲染图表
 */
function renderChart() {
  var innerHTML="",i=0;
  var wrapper = document.getElementById("aqi-chart-wrap");
  var width=show.clientWidth;
  var selectedData=chartData[pageState.nowSelectCity][pageState.nowGraTime];
  var len=Object.keys(selectedData).length;
  var posObj=getWidth(width,len);
  innerHTML+="<div class='title'>"+pageState.nowSelectCity+"市01-03月"+getTitle()+"空气质量报告</div>";
  for (var key in selectedData) {
    innerHTML += "<div class='aqi-bar " + pageState.nowGraTime + "' style='height:" + selectedData[key] + "px; width: " + posObj.width +"px; left:" + (posObj.left * i + posObj.offsetLeft) + "px; background-color:" + colors[Math.floor(Math.random() * 11)] + "'></div>"
    innerHTML += "<div class='aqi-hint' style='bottom: " + (selectedData[key] + 10) + "px; left:" + getHintLeft(posObj, i++) + "px'>" + key + "<br/> [AQI]: " + selectedData[key] + "</div>"
  }
  wrapper.innerHTML = innerHTML;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(target) {
  // 确定是否选项发生了变化
  var value=target.value;
  var item=target.previousElementSibling;
  var items = document.getElementsByTagName('span');
  for (var i = 0; i < items.length; i++) {
    items[i].className = "";
  }
  item.className = "selected";

  // 设置对应数据
  pageState.nowGraTime = value;
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  pageState.nowSelectCity=citySelect.options[citySelect.selectedIndex].value;
  // 设置对应数据
  renderChart();
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  addHandler(document.getElementsByClassName("grade")[0],'change',function(event){
    event=getEvent(event);
    var target=getTarget(event);
    graTimeChange(target);
  });
  addHandler(document, 'mouseover', function(event){
    var ele = event.target;
    ele.className += " show";
  });
  addHandler(document, 'mouseout', function(event){
    var ele = event.target;
    ele.className = ele.className.replace(/show/, "");
  });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var fragment=document.createDocumentFragment();
  for(var city in aqiSourceData)
  {
    var option=document.createElement("option");
    option.value=city;
    option.innerHTML=city;
    fragment.appendChild(option);
  }
  citySelect.appendChild(fragment);
  citySelect.children[0].checked="checked";
  pageState.nowSelectCity=citySelect.children[0].value;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addHandler(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */

function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var monthDays=[0,31,29,31];
  for(var city in aqiSourceData)
  {
    var months={},tmpCity={},weeks={};
    var tmp=aqiSourceData[city];//获得每个城市的所有数据
    var tmpData=[];
    for(var date in tmp)
    tmpData.push(tmp[date]);
    var index=0;
    for(var i=1;i<monthDays.length;i++)//所有月份
    {
      index+=monthDays[i-1];
      var monthTotal=0;
      var tmpMonthDays=monthDays[i];
      var firstDay=new Date(2016,i-1,1);
      var weekday=firstDay.getDay();//获取每月第一天在星期几
      var weekCount= 0,weekTotal= 0,weekIndex=0;
      for(var j=0;j<tmpMonthDays;j++)//每个月
      {
        monthTotal+=tmpData[index+j];
        weekTotal+=tmpData[index+j];
        weekCount++;weekday++;
        if(weekday==6)
        {
          weeks["第"+i+"月"+"第"+(++weekIndex)+"周"]=Math.round(weekTotal/weekCount);
          weekCount=weekday=weekTotal=0;
        }
      }
      months[i]=Math.round(monthTotal/monthDays[i]);
    }
    tmpCity.months=months;
    tmpCity.weeks=weeks;
    tmpCity.days=tmpData;
    chartData[city]=tmpCity;
  }

  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();

function test()
{
  alert("pass");
}