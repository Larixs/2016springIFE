


//日历功能：输入日期跳转，选择年月跳转，可隐藏显示，上下限选择
//输入参数：css样式（表头，日历可选择小格，日历不可选择小格，选中格，选择框）,起始年月终止年月
//输出：获得当前选中日期、返回一个日期对象

//因为是练习,所以jQuery和dom都有使用,混合着练习,所以语法有些乱



(function (){

	function Calender(opt){
		this.limit=opt.limit;
        this.$parentNode=$(opt.parentNode);
		this.time={
            year:opt.initTime.getFullYear(),
            mon:opt.initTime.getMonth(),
            day:opt.initTime.getDate()
        };//当前选定的时间
        this.isLeapYear=function () {
            return (this.time.year%100==0)?(this.time.year%400==0):(this.time.year%4==0);
        };
        this.$calender=$('<div></div>');//日历整体,包裹cal
        this.$calButton=$('<button class="calButton">日历</button>');//显示隐藏日历的按钮
        this.$calSelect=$('<div class="calSelect"></div>');//选择日期
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
            var moveTime=300;
            this.renderSelect();
            this.$calTitle.append(this.$backButton).append(this.$timeTitle).append(this.$forButton);
            this.$cal.append(this.$calTitle).append(this.$weekTitle).append(this.$calBody).hide();
            this.$calender.append(this.$calButton).append(this.$calSelect).append(this.$cal);
            this.$calButton.click(function () {
                $(this).next().next().toggle(moveTime);
            });
            this.$calSelect.click(function () {
               $(this).next().show(moveTime);
            });
            this.$calBody.click(function (event) {
                var target=event.target;
                var value=target.innerHTML;
                bodyClick(value);

            });

            var that = this;
            function bodyClick(value) {
                that.time.day=value;
                that.renderSelect();
                that.$cal.hide(moveTime);
            }

            for(var i=0;i<7;i++){
                var $weekTitleCell=$('<div class="weekTitleCell">'+this.days[i]+'</div>');
                this.$weekTitle.append($weekTitleCell);
                if(i==0||i==6)
                {
                    $weekTitleCell.addClass("weekends");
                }
            }
            var that=this;
            function back(){
                if(that.time.year==that.limit.startYear)
                {
                    if (that.time.mon==that.limit.startMon-1)
                    {
                        return; //到设定的时间就不会往前翻了
                    }

                }
                if(that.time.mon==0){
                    that.time.mon=11;
                    that.time.year--;
                }
                else{
                    that.time.mon--;
                }

                var days=that.months[that.time.mon];
                if(that.time.mon==1&&that.isLeapYear())
                    days++;
                that.time.day=that.time.day<days?that.time.day:days;
                that.renderSelect();
                that.renderTable();
            }
            function forward(){
                if(that.time.year==that.limit.endYear)
                {
                    if (that.time.mon==that.limit.endMon-1)
                    {
                        return;
                    }

                }
                if(that.time.mon==11){
                    that.time.mon=0;
                    that.time.year++;
                }
                else{
                    that.time.mon++;
                }
                var days=that.months[that.time.mon];
                if(that.time.mon==1&&that.isLeapYear())
                    days++;
                that.time.day=that.time.day<days?that.time.day:days;
                that.renderSelect();
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
        renderSelect:function () {
            this.$calSelect.html("");
            var startYear=this.limit.startYear;
            var endYear=this.limit.endYear;
            var startMon=this.limit.startMon;
            var endMon=this.limit.endMon;
            var option="";
            var that=this;
            function  createSelect(par,classname,opt) {
                var select=document.createElement("select");
                select.classList.add(classname);
                select.innerHTML=opt;
                par.appendChild(select);
                return select;
            }
            function createOptionStr(option,start,end,selected) {
                for(var i=start;i<=end;i++)
                {
                    if(i==selected)
                        option += '<option selected="selected">'+i+'</option>';
                    else
                        option += '<option>'+i+'</option>';
                }
                return option;
            }
            function selectChange(select,target) {
                var value=target.options[target.selectedIndex].value;
                that.time[select]=value;
                if(select=="year")
                {
                    if (value==that.limit.startYear)
                    {
                        target.nextSibling.innerHTML=createOptionStr("",that.limit.startMon,12,that.time.mon+1);
                    }else if(value==that.limit.endYear){
                        target.nextSibling.innerHTML=createOptionStr("",1,that.limit.endMon,that.time.mon+1);
                    }
                    var days=that.months[that.time.mon];
                    if(that.time.mon==1&&that.isLeapYear())
                        days++;
                    that.time.day=that.time.day<days?that.time.day:days;
                    target.nextSibling.nextSibling.innerHTML=createOptionStr("",1,days,that.time.day);
                }
                else if(select=="mon")
                {
                    that.time[select]--;
                    var days=that.months[that.time.mon];
                    if(that.time.mon==1&&that.isLeapYear())
                        days++;
                    that.time.day=that.time.day<days?that.time.day:days;
                    target.nextSibling.innerHTML=createOptionStr("",1,days,that.time.day);
                }
                that.renderTable();
            }


            var option=createOptionStr(option,this.limit.startYear,this.limit.endYear,this.time.year);
            var selectYear=createSelect(this.$calSelect[0],"selectYear",option);
            selectYear.addEventListener('change',function () {
                selectChange("year",this);
            },false);
            option="";


            option = (endYear==startYear) ? createOptionStr(option,startMon,endMon,this.time.mon+1)
                :createOptionStr(option,1,12,this.time.mon+1);
            var selectMon = createSelect(this.$calSelect[0],"selectMon",option);
            option = "";
            selectMon.addEventListener('change',function (event) {
                selectChange("mon",this);
            },false);


            var days=this.months[this.time.mon];

            if(this.time.mon==1&&this.isLeapYear())
                days++;

            option=createOptionStr(option,1,days,this.time.day);
            var selectDay=createSelect(this.$calSelect[0],"selectDay",option);
            selectDay.addEventListener('change',function (event) {
                selectChange("day",this);
            },false);


        },
        renderTable: function () {
            this.$calBody[0].innerHTML="";
            var mon = this.time.mon;
            var year = this.time.year;
            var firstDay = new Date(year,mon,1);
            var fDay = firstDay.getDay();
            this.$timeTitle.text(year+'年'+(mon+1)+'月');

            var monDays=this.months[mon];
            var fragment=document.createDocumentFragment();
            if(mon==1&&this.isLeapYear()) monDays++;
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
		limit:{
            startYear:2015,
            startMon:2,
            endYear:2017,
            endMon:10
        }

	};


	var newCalender=new Calender(opt);

//    newCalender.getSelectTime();//获得当前选中的时间


})();


