(function(){
    var checkPass={};
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
            tipDefault:"必填，长度为4~16个字符（首尾空格不计入）",
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
            EventUtil.addHandler(this.in,'blur',this.checkContent.bind(this));
            EventUtil.addHandler(this.in,'focus',this.tipDefault.bind(this));
            checkPass[this.name]=false;
        },
        tipDefault:function(){
            this.tipChange(this.tipStr.tipDefault,this.tipStrColor.tipDefault);
        },
        tipChange:function(str,style){
            this.tip.innerHTML=str;
            this.tip.style.color=style;
            this.in.style.border="2px solid "+style;
        }
    };
    function nameTest(){
        var name=new Test("name");
        name.checkContent=function(){
            var value=this.in.value.trim();
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
                    checkPass[this.name]=false;
                    return;}
            }
            if(count==0) {
                this.tipChange(this.tipStr.tipNull,this.tipStrColor.tipWrong);
                checkPass[this.name]=false;
            }
            else{
                if(count>16||count<4)
                {
                    this.tipChange(this.tipStr.tipWrongLength,this.tipStrColor.tipWrong);
                    checkPass[this.name]=false;
                }
                else
                {
                    this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass);
                    checkPass[this.name]=true;
                }

            }
        };
        name.init();
    }
    function passwordTest(){
        var password=new Test("password");
        var passwordConfirm=new Test("passwordConfirm");
        password.tipStr={
            tipDefault:"必填，长度为4~16，只能输入大小写英文字母、英文符号",
            tipWrongLength:"长度不符合要求",
            tipWrongWord:"只接受英文字母、英文符号",
            tipPass:"密码可用"
    };
        passwordConfirm.tipStr={
            tipDefault:"再次输入相同密码",
            tipWrong:"密码错误",
            tipPass:"验证通过"
        };
        password.checkContent=function(){
            var value=this.in.value;
            var Unicode=0;
            if(value.length<4||value.length>16)
            {
                this.tipChange(this.tipStr.tipWrongLength,this.tipStrColor.tipWrong);
                checkPass[this.name]=false;
                return;
            }
            for(var i=0;i<value.length;i++)
            {
                Unicode=value.charCodeAt(i);
               if(Unicode>0x007F){
                    this.tipChange(this.tipStr.tipWrongWord,this.tipStrColor.tipWrong);
                    checkPass[this.name]=false;
                    return;}
            }
            checkPass[this.name]=true;
            this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass)
        };
        passwordConfirm.checkContent=function(){
            var value=this.in.value;
            var passwordCon=password.in.value;
            if(value===passwordCon&&(passwordCon.length<17)&&(3<passwordCon.length))
            {
                checkPass[this.name]=true;
                this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass)
            }else{
                checkPass[this.name]=false;
                this.tipChange(this.tipStr.tipWrong,this.tipStrColor.tipWrong)
            }
        };
        password.init();
        passwordConfirm.init();
    }
    function emailTest(){
        var email=new Test("email");
        email.tipStr={
            tipDefault:"请输入邮箱",
            tipWrong:"邮箱格式错误",
            tipPass:"验证通过"
        };
        email.checkContent=function(){
            var value=this.in.value;
            var reg=/\w+[\w.]*@[\w]+\.\w+/m;
            var match=reg.exec(value);
            if(match){
                checkPass[this.name]=true;
                this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass)
            }else{
                checkPass[this.name]=false;
                this.tipChange(this.tipStr.tipWrong,this.tipStrColor.tipWrong)
            }
        };
        email.init();
    }
    function phoneNumberTest(){
        var phoneNumber=new Test("phoneNumber");
        phoneNumber.tipStr={
            tipDefault:"请输入11位手机号",
            tipWrong:"手机号错误",
            tipPass:"验证通过"
        };
        phoneNumber.checkContent=function(){
            var value=this.in.value;
            var reg=/[^0-9]/m;
            var match=reg.exec(value);
            if(value.length!=11||match){
                checkPass[this.name]=false;
                this.tipChange(this.tipStr.tipWrong,this.tipStrColor.tipWrong);
            }else{
                checkPass[this.name]=true;
                this.tipChange(this.tipStr.tipPass,this.tipStrColor.tipPass);
            }
        };
        phoneNumber.init();
    }
    function submitInit(name){
        var submit=document.getElementById(name+"Submit");
        EventUtil.addHandler(submit,'click',submitCheck);
    }
    function submitCheck(){
        for(var tmp in checkPass){
            if(!checkPass[tmp])
            {
                alert("信息不完整！");
                return;
            }
        }
        alert("验证通过！")
    }
    function init(){
        nameTest();
        passwordTest();
        emailTest();
        phoneNumberTest();
        submitInit("information");
    }
    init();
})();