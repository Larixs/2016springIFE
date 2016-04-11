/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var table=document.getElementById("aqi-table");
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var strCity=document.getElementById("aqi-city-input").value.trim();
  var strAqi=document.getElementById("aqi-value-input").value.trim();
  var reg = /^[A-Za-z\u4E00-\u9FA5]+$/;
  if(!reg.test(strCity)){
    alert("城市名必须为中英文字符！");
    return;
  }
  reg =/^\d+$/;
  if(!reg.test(strAqi)){
    alert("空气质量指数必须为整数！");
    return;
  }

  aqiData[strCity]=strAqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var fragment=document.createDocumentFragment();

  table.innerHTML="";
  for(var strCity in aqiData) {

    if (table.children.length === 0)//aqiDate中有数据再执行
      table.innerHTML = "<tr> <td>城市</td> <td>空气质量</td> <td>操作</td> </tr>";
    var line=document.createElement("tr");
    line.innerHTML="<td>"+strCity+"</td>"+"<td>"+aqiData[strCity]+"</td>"+"<td><button class='del-btn' onclick='delBtnHandle(this)'>删除</button></td>";
    fragment.appendChild(line);
  }
  table.appendChild(fragment);
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  var delCity=target.parentElement.parentElement.children[0].innerHTML;
  delete aqiData[delCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick=addBtnHandle;
}

init();