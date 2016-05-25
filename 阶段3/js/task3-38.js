/* javascript for task3-38.html */

var tableTool=(function(){

	function init(opt){
		var instance = new sortTable(opt);
		return instance;
	}
	function sortTable(opt){//table是需要排列的表格
		this.parent=document.getElementById(opt.parent);
		this.opt=opt;
		this.tbody=this.renderTable();
		this.bindSortButton();
	}

	sortTable.prototype = {

	  constructor : sortTable,

	  renderTable : function(){
	  	this.parent.innerHTML="";
	  	var table = document.createElement("table");
		var thead = document.createElement("tr");
		var tbody = document.createElement("tbody");
		table.appendChild(thead);
		table.appendChild(tbody);
		var len = this.opt.thead.length;
		var i = 0;
		for( ; i < len ; i++)
		  {
		  	var thdata=document.createElement("th");
		  	thdata.innerHTML=this.opt.thead[i];
		  	if(this.opt.sortLine[i]){
		  		thdata.innerHTML+=
		  		"<span class='sortdown sort"+i+"'>▼</span>"
		  		+"<span class='sortup sort"+i+"'>▲</span>";
		  	}
		  	
		  	thead.appendChild(thdata);
		  }
		var datas = this.opt.data;  
		for(var i in datas){
			var line=tbody.insertRow(i-1);
		 	for(var j = 0; j < len ; j++){
		 		var cell=document.createElement("td");
		 		cell.innerHTML=datas[i][j];
		 		line.appendChild(cell);
		 	}
		}		
		table.classList.add(this.opt.tableClassName);
		thead.classList.add(this.opt.headClassName);
		this.parent.appendChild(table);
		return tbody;
	  },


	  bindSortButton: function(){

		var datas = this.opt.data;
		var that=this;
		function sort(i,dir){		
				var datas = that.opt.data;
				function compareUp(value1,value2){
					return value1[i] - value2[i];
				}	
				function compareDown(value1,value2){
					return value2[i] - value1[i];
				}
				if(dir){
					 datas.sort(compareDown);
				}
				else{
					datas.sort(compareUp);
				}		
				var tbody=that.tbody;
				var len=that.opt.thead.length;
				tbody.innerHTML="";
				var i=0;
				for(var x in datas){
					var line=tbody.insertRow(i);
		 			for(var j = 0; j < len ; j++){
		 				var cell=document.createElement("td");
		 				cell.innerHTML=datas[i][j];
		 				line.appendChild(cell);
		 			}
		 			i++;
		 		}
			
		}
		function sortjud(){
			
			 var i= this.classList[1].replace(/[^0-9]/ig,""); 
			 this.classList[0]==="sortup"?sort(i,true):sort(i,false);
		}
		var upButtons = document.getElementsByClassName("sortup");
		var downButtons = document.getElementsByClassName("sortdown");
		var butttonlen = upButtons.length;
		var i = 0;
		for(; i < butttonlen;i++){
			if(!upButtons[i].onclick) 
			//所有的排序按钮都用的相同的class
			//如果不判断这个按钮是否已经被添加过onclick
			//那么最先生成的按钮会被多次赋予onclick事件
			//导致最后的事件并非一开始监听的事件，而是最后一次赋予的事件
			{
				upButtons[i].onclick=sortjud;
				downButtons[i].onclick=sortjud;
			}
		}
	}

	}
	
	return {
		init:init
	};

})();

(function(){
	var opt = {
		parent:"sort",
		tableClassName:"sortTable",
		headClassName:"sortTableHead",
		thead:['姓名','语文','数学'],
		sortLine:[false,true,true],//需要排序的行列
		data:[
			['习习',52,80],
			['蛤蛤',100,76],
			['丽媛',48,66],
			['小平',78,20],
			['高富帅',22,88],
			['续命',87,82],
			['华莱士',52,53]
		]
	};
	var opt1 = {
		parent:"sort1",//需要id值
		tableClassName:"sortTable",
		headClassName:"sortTableHead",
		thead:['姓名','英语','物理','体育'],
		sortLine:[false,true,false,true],//需要排序的行列
		data:[
			['习习',52,80,34],
			['蛤蛤',100,76,46],
			['的命',87,82,10],
			['丽媛',48,66,34],
			['小平',78,20,94],
			['高富帅',22,88,84],
			['续命',87,82,20],
			['华莱士',52,53,99]
		]
	};
	
	tableTool.init(opt);
	tableTool.init(opt1);
})();

// 调用方法：tableTool.init(opt)，opt是数据，需要有例中的各项属性。

