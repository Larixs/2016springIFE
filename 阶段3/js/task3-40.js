


//日历功能：输入日期跳转，选择年月跳转，可隐藏显示，上下限选择
//输入参数：css样式（表头，日历可选择小格，日历不可选择小格，选中格，选择框）,起始年月终止年月
//输出：获得当前选中日期、返回一个日期对象

(function (){

	function calender(opt){
		this.opt=opt;
		this.time=opt.initTime; //时间初始化
		this.selectedTime=this.time;
		this.calender = this.init();	
		return this.calender;
	}

	calender.prototype= {
        months:[31,28,31,30,31,30,31,31,30,31,30,31],
        days:['日','一','二','三','四','五','六'],
        init: function () {
            this.$calender=$('<div></div>');
            this.$calButton=$('<button class="calButton">日历</button>');
            this.$cal=$('<div class="cal"></div>');
            this.$calTitle=$('<div class="calTitle"></div>');
            this.$calBody=$('<div class="calBody">body</div>');
            this.$backButton=$('<span class="backButton"> << </span>');
            this.$forButton=$('<span class="forButton"> >> </span>' );
            this.$timeTitle=$( '<span class="timeTitle">title</span>');
            this.$calTitle.append(this.$backButton).append(this.$timeTitle).append(this.$forButton);
            //创建div,写这么麻烦是为了避免在一个页面里插入两个日历时,绑定点击事件时重复绑定
            this.$cal.append(this.$calTitle).append(this.$calBody);
            this.$calender.append(this.$calButton).append(this.$cal);
            this.$calButton.click(function () {
                $(this).next().toggle();
            });
            this.$backButton.click(function () {
                //$(".calBody").hide();
            });
            this.$forButton.click(function () {

            });

            this.renderTable();
            return this.$calender;
        },
        renderTable: function () {
            var mon = this.time.getMonth();
            var year = this.time.getFullYear();
            var isLeapYear = (year%100==0)?(year%400==0):(year%4==0);
            var firstDay = new Date(year,mon,1);
            var day = firstDay.getDay();
            this.$timeTitle.text(year+'年'+mon+'月');
            var totalDays = day + this.months[mon];
            if(mon==1&&isLeapYear) totalDays++;
            console.log(totalDays);
        },
        setSelectTime:function () {

        },
        getSelectTime: function () {

            return this.selectedTime.getFullYear();
        }
    };


	var opt={
        initTime:new Date(),
		startYear:2000,
		startMon:1,
		endYear:2099,
		endMon:12
	};


	var newCalender=new calender(opt); 
	$("#calender").append(newCalender);

})();

