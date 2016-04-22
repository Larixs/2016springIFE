(function(){
    var EventUtil={//浏览器兼容
        addHandler:function(element,type,handler){
            if(addEventListener){
                element.addEventListener(type,handler,false);
            }else if(attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type]=handler;
            }
        }
    };
    Function.prototype.bind=function(obj){
      var that=this;
        return function (){
            that.apply(obj,arguments);
        };
    };
    function Test(name){
        this.name=name;
        this.in=document.getElementById(name+"In");
        this.tip=document.getElementById(name+"Tip");
        this.testButton=document.getElementById(name+"Test");
        this.tipStr={
            tipDefault:"必填，长度为4~16个字符（包含空格）",
            tipNull:"姓名不能为空",
            tipWrongLength:"长度不符合要求，请输入长度为4~16位的名称（汉字、中文符号的长度为2）",
            tipWrongWord:"只接受英文字母、英文符号、中文汉字、中文符号和数字",
            tipPass:"验证通过"
        };
        this.tipStrColor={
            tipDefault:"gray",
            tipWrong:"#E87064",
            tipPass:"#94D8BF"
        };
        this.checkContent=function(){
        };
    }
    Test.prototype={
        constructor:Test,
        init:function(){
            EventUtil.addHandler(this.testButton,'click',this.checkContent.bind(this));
        },
        tipChange:function(str,style){
            this.tip.innerHTML=str;
            this.tip.style.color=style;
            this.in.style.border="1px solid "+style;
        }
    };
    function nameTest(){
        var nameTest=new Test("name");
        nameTest.checkContent=function(){
            var value=this.in.value;
            var count= 0,Unicode=0;
            for(var i=0;i<value.length;i++)
            {
                Unicode=value.charCodeAt(i);
                if(Unicode>0x4E00&&Unicode<0x9Fa5){
                    count+=2;
                }else if((Unicode>=0x0000&&Unicode<=0x007F)){
                    count++;
                }else{
                    this.tipChange(this.tipStr.tipWrongWord,this.tipStrColor.tipWrong);
                    return;}
            }
            if(count==0) {
                this.tipChange(this.tipStr.tipNull,this.tipStrColor.tipWrong);
            }
            else{
                if(count>16||count<4)
                    this.tipChange(this.tipStr.tipWrongLength,this.tipStrColor.tipWrong);
                else
                    this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass);
            }
        };
        nameTest.init();
    }
    nameTest();
})();