


//日历功能：输入日期跳转，选择年月跳转，可隐藏显示，上下限选择
//输入参数：css样式（表头，日历可选择小格，日历不可选择小格，选中格，选择框）,起始年月终止年月
//输出：获得当前选中日期、返回一个日期对象

//因为是练习,所以jQuery和dom都有使用,混合着练习,所以语法有些乱



(function (){

	function Calender(opt){
		this.opt=opt;
        this.$parentNode=$(this.opt.parentNode);
		this.time={
            year:opt.initTime.getFullYear(),
            mon:opt.initTime.getMonth(),
            day:opt.initTime.getDate()
        };//当前选定的时间
        this.$calender=$('<div></div>');//日历整体,包裹cal
        this.$calButton=$('<button class="calButton">日历</button>');//显示隐藏日历的按钮
        this.$cal=$('<div class="cal"></div>');//日历整体
        this.$calTitle=$('<div class="calTitle"></div>');//显示年月、按钮
        this.$backButton=$('<span class="backButton"> << </span>');//以前按钮
        this.$forButton=$('<span class="forButton"> >> </span>' );//以后按钮
        this.$timeTitle=$( '<span class="timeTitle">title</span>');//显示年月
        this.$weekTitle=$('<div class="weekTitle"></div>');
        this.$calBody=$('<div class="calBody"></div>');//显示每天
		this.calender = this.init();
		this.$parentNode.append(this.calender);
	}

	Calender.prototype= {
        constructor:Calender,
        months:[31,28,31,30,31,30,31,31,30,31,30,31],
        days:['日','一','二','三','四','五','六'],
        init: function () {
            this.$calTitle.append(this.$backButton).append(this.$timeTitle).append(this.$forButton);
            //创建div,写这么麻烦是为了避免在一个页面里插入两个日历时,绑定点击事件时重复绑定
            this.$cal.append(this.$calTitle).append(this.$weekTitle).append(this.$calBody);
            this.$calender.append(this.$calButton).append(this.$cal);
            this.$calButton.click(function () {
                $(this).next().toggle();
            });

            for(var i=0;i<7;i++){
                var $weekTitleCell=$('<div class="weekTitleCell">'+this.days[i]+'</div>')
                this.$weekTitle.append($weekTitleCell);
                if(i==0||i==6)
                {
                    $weekTitleCell.addClass("weekends");
                }
            }
            var that=this;
            function back(){
                if(that.time.mon==0){
                    that.time.mon=11;
                    that.time.year--;
                }
                else{
                    that.time.mon--;
                }
                that.renderTable();
            }
            function forward(){
                if(that.time.mon==11){
                    that.time.mon=0;
                    that.time.year++;
                }
                else{
                    that.time.mon++;
                }
                that.renderTable();
            }
            this.$backButton.click(function () {
                back();
            });

            this.$forButton.click(function () {
                forward();
            });
            this.renderTable();
            return this.$calender;
        },
        renderTable: function () {
            this.$calBody[0].innerHTML="";
            var mon = this.time.mon;
            var year = this.time.year;
            var isLeapYear = (year%100==0)?(year%400==0):(year%4==0);
            var firstDay = new Date(year,mon,1);
            var fDay = firstDay.getDay();
            this.$timeTitle.text(year+'年'+(mon+1)+'月');



            var monDays=this.months[mon];
            var fragment=document.createDocumentFragment();
            if(mon==1&&isLeapYear) monDays++;
            for(i=0;i<fDay;i++)
            {
                var $cell=$('<div class="calCell"></div>');
                fragment.appendChild($cell[0]);
            }
            for(i=1;i<=monDays;i++){
                var $cell=$('<div class="calCell">'+i+'</div>');
                //用事件代理会优化性能?
                $cell.hover(function () {
                    $(this).toggleClass("mouseOver");
                },function () {
                    $(this).toggleClass("mouseOver");
                });
                $cell.click(function () {
                    this.classList.add("selectedCell");
                    $(this).siblings().removeClass("selectedCell");
                });
                if(i==this.time.day)
                {
                    $cell.addClass("selectedCell");
                }
                fragment.appendChild($cell[0]);
                var day=((fDay+(i-1))%7);
                if(day==0||day==6)
                {
                    $cell.addClass("weekends");
                }
            }

            this.$calBody.append(fragment);
        },
        getSelectTime: function () {
            this.time.day=$(".selectedCell").html();
            console.log(this.time.year+","+this.time.mon+","+this.time.day);
        }
    };


	var opt={
        parentNode:$("#calender"),
        initTime:new Date(),
		startYear:2000,
		startMon:1,
		endYear:2099,
		endMon:12
	};


	var newCalender=new Calender(opt);

    newCalender.getSelectTime();//获得当前选中的时间


})();


function handleResponse(response) {
    alert("you are at IP address " + response.ip + ",which is in" + response.city
    + "," + response.region_name);
}
var script = document.createElement("script");
script.src="http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script,document.body.firstChild);

