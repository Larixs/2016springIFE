(function(){
    var EventUtil={
        addHandler:function(event,type,handler){
            if(addEventListener){
                event.addEventListener(type,handler,false);
            }else if(attachEvent){
                event.attachEvent("on"+type,handler)
            }else{
                event["on"+type]=handler;
            }
        },
        getEvent:function(event){
            return event?event:window.event;
        },
        getTarget:function(event){
            return event.target||event.srcElement;
        }
    };
    var schools={
        "北京":["北京大学","清华大学","北京电影学院","中央戏剧学院","北京师范大学","其他"],
        "上海":["复旦大学","上海交通大学","上海财经大学","上海戏剧学院","上海师范大学","其他"],
        "南京":["南京大学","其他"],
        "西安":["西安交通大学","其他"],
        "成都":["四川大学","四川师范大学","电子科技大学","其他"]
    };
    function getId(obj){
        return document.getElementById(obj);}
    function creEle(obj){
        return document.createElement(obj);}
    function addOpt(fragment,innerHTML)
    {
        var option=creEle("option");
        option.innerHTML=innerHTML;
        fragment.appendChild(option);
    }
    function creLastEle(target,type){//传入想要添加的结点的父节点，和想要添加的结点类型
        var tmp=target.lastElementChild;//检测type类型是否存在，不存在则添加
       if (tmp.tagName.toLowerCase()!=type)
       {
           tmp=creEle(type);
           target.appendChild(tmp);
       }else tmp.innerHTML="";
        return tmp;
    }
    function render(selector,city){
        var school=schools[city];
        var select=creEle("select");
        var fragment=document.createDocumentFragment();
        for(var i=0;i<school.length;i++){
            addOpt(fragment,school[i]);
        }
        select.appendChild(fragment);
        if(!selector.nextElementSibling)
            selector.parentNode.appendChild(select);
        else {
            selector.parentNode.replaceChild(select,selector.nextElementSibling);
        }
    }
    function showAtSchool(target){
        var tmp=creLastEle(target.parentNode.parentNode,"div");
        var selector=creEle("select");
        tmp.appendChild(selector);
        var fragment=document.createDocumentFragment();
        for (var city in schools) {
            addOpt(fragment, city);
        }
        render(selector,fragment.firstElementChild.innerHTML);
        EventUtil.addHandler(selector, 'change', function () {
            var cityName=this.options[this.selectedIndex].value;
            render(selector,cityName);
        });
        selector.appendChild(fragment);
    }
    function showNotAtSchool(target){
        var tmp=creLastEle(target.parentNode.parentNode,"div");
        tmp.innerHTML="<input type='text' placeholder='请填写最高学历'>";
    }
    function init(){
        EventUtil.addHandler(getId("schoolStatus"),'click',function(event){
             event=EventUtil.getEvent(event);
             var target=EventUtil.getTarget(event);
            if(target.value=="atSchool")
                showAtSchool(target);
            else if(target.value=="notAtSchool")
                showNotAtSchool(target);
        })
    }
    init();
})();
