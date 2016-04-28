function createFlow(obj,title,titleBackColor,titleColor,mainAlert,mainBackColor,mainColor,maskColor,functionYes){
    function getId(obj){
        return document.getElementById(obj);
    }
    function creEle(obj){
        return document.createElement(obj);
    }
    var EventUtil={
        addHandler:function(element,type,handler){
            if(element.addEventListener){
                element.addEventListener(type,handler,false);
            }else if(element.attachEvent){
                element.attachEvent("on"+type,handler);
            }else
                element["on"+type]=handler;
        }
    };
    function getH(){
        var pageHeight=window.innerHeight;
        if(typeof pageHeight!="number"){
            pageHeight=document.compatMode=="CSS1Compat"?document.documentElement.clientHeight:document.body.clientHeight;
        }
        return pageHeight;
    }
    function getW(){
        var pageWidth=window.innerWidth;
        if(typeof pageWidth!="number"){
                pageWidth=document.compatMode=="CSS1Compat"?document.documentElement.clientWidth:document.body.clientWidth;
        }
        return pageWidth;
    }
    function createAlert(title,titleBackColor,titleColor,mainAlert,mainBackColor,mainColor){//创建浮层窗口
        var flow=creEle("div");
        var flowTitle=creEle("div");
        var flowMain=creEle("div");
        var flowMainText=creEle("div");
        var yes=creEle("button");
        var cancel=creEle("button");
        flow.style.cssText="z-index:999;height:300px;width:400px;position:fixed;text-align:center;";
        var pageHeight=getH(),pageWidth=getW();
        flow.style.top=(pageHeight-300)/2+"px";//怎么做到随窗口缩放而改变位置呢
        flow.style.left=(pageWidth-400)/2+"px";
        flow.style.display="none";
        flowTitle.innerHTML=title;
        flowTitle.style.cssText="background-color:"+titleBackColor+";color:"+titleColor+";width:400px;height:60px;position:relative";
        flowMain.appendChild(flowMainText);
        flowMain.appendChild(yes);
        flowMain.appendChild(cancel);
        flowMainText.innerHTML=mainAlert;
        flowMainText.style.cssText="position:relative;top:70px;height:100px;";
        yes.innerHTML="确认";
        cancel.innerHTML="取消";
        yes.style.cssText="position:absolute;right:80px;bottom:20px;border:none;border-radius:3px;cursor:pointer;";
        cancel.style.cssText="position:absolute;right:30px;bottom:20px;border:none;border-radius:3px;cursor:pointer;";
        flowMain.style.cssText="background-color:"+mainBackColor+";color:"+mainColor+";width:400px;height:240px;position:relative;";
        flow.appendChild(flowTitle);
        flow.appendChild(flowMain);
        return flow;
    }
    function createMask(maskColor){//创建mask
        var mask=creEle("div");
        mask.style.cssText="background-color:"+maskColor+";width:100%;height:100%;z-index:998;position:fixed;left:0;top:0;display:none;";
        return mask;
    }
    function init(obj,title,titleBackColor,titleColor,mainAlert,mainBackColor,mainColor,maskColor)
    {
        var logIn=createAlert(title,titleBackColor,titleColor,mainAlert,mainBackColor,mainColor);
        var logInBack=createMask(maskColor);
        var buttons=logIn.querySelectorAll("button");
        EventUtil.addHandler(buttons[0],'click',functionYes);
        EventUtil.addHandler(buttons[0],'click',function(){
            logIn.style.display="none";
            logInBack.style.display="none";});
        EventUtil.addHandler(buttons[1],'click',function(){
        logIn.style.display="none";
        logInBack.style.display="none";});
        document.getElementsByTagName("body")[0].appendChild(logIn);
        document.getElementsByTagName("body")[0].appendChild(logInBack);
        EventUtil.addHandler(logInBack,'click',function(){
            logIn.style.display="none";
            logInBack.style.display="none";
        });
        EventUtil.addHandler(obj,'click',function(){
            logIn.style.display="block";
            var pageHeight=getH(),pageWidth=getW();
            logIn.style.top=(pageHeight-300)/2+"px";//怎么做到随窗口缩放而改变位置呢
            logIn.style.left=(pageWidth-400)/2+"px";
            logInBack.style.display="block";
        })
    }
    init(obj,title,titleBackColor,titleColor,mainAlert,mainBackColor,mainColor,maskColor);
}
//参数分别是：触发浮层的元素，弹出框的title文本，title背景颜色，title字色，主框文本，主框背景颜色，主框字色，mask颜色，点击确认按钮产生的效果
createFlow(document.querySelector("header").querySelector("span"),"浮出层标题","#433F3F","white","浮出层内容","white","#433F3F","rgba(181, 181, 181, 0.58)",function(){alert("您点击了确认按钮")});
