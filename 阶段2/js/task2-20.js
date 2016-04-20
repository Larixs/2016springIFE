(function(){
        var text=document.getElementById("textIn");
        var numbers=[];
        var buttons=document.getElementsByTagName("button");
        var EventUtil= {//兼容浏览器
            addHandler: function (element, type, handler) {
                if (addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (attachEvent) {
                    element.attachEvent("on" + type, handler);
                } else element["on" + type] = handler;},
            getEvent:function (event) {
                return event ? event : window.event;},
            getTarget:function (event) {
                return event.target || event.srcElement;}
        };
        function checkNumber(){
            var number=text.value.trim();
            var reg =/[0-9a-zA-Z\u4E00-\u9FA5]+/g;
            var match=reg.exec(number);
            var matches=[];
            do {
                if (numbers.length < 61) {
                    if(match[0])
                        matches.push(match[0]);
                    match=reg.exec(number);
                } else {
                    alert("输入的元素已经有60个了，不能再输入了~");
                    return false;
                }
            }while(match);
            return matches;
        }
        var Operation=
        {
            showArray:document.getElementById("showArray"),
            search:document.getElementById("search"),
            render:function(){
                var innerHTML="";
                for(var i=0;i<numbers.length;i++)
                {
                    innerHTML+="<div class='cell' title='"+numbers[i]+"' id='"+i+"'>"+numbers[i]+"</div>";
                }
                Operation.showArray.innerHTML=innerHTML;
            },
            LeftIn:function () {
                var number = checkNumber();
                numbers=number.concat(numbers);
                Operation.render();
            },
            RightIn:function() {
                var number = checkNumber();
                numbers=numbers.concat(number);
                Operation.render();
            },
            LeftOut: function() {
                var tmp =numbers.shift();
                alert("弹出了" + tmp);
                Operation.render();
            },
            RightOut:function() {
                var tmp =numbers.pop();
                alert("弹出了" + tmp);
                Operation.render();
            },
            DeleteNumber:function(target) {
                if(target.id<61&&target.id>-1)
                {numbers.splice(target.id,1);
                    Operation.render();
                }
            },
            Search:function(){
                if(Operation.search.value) {
                    Operation.render();
                    var reg=new RegExp(Operation.search.value,"m");
                    for(var i=0;i<numbers.length;i++){
                        var match=reg.test(numbers[i]);
                        if(match)
                        {
                            document.getElementById(""+i).style.color="red";
                        }
                    }
                }

            }
        };
        function init(){
            EventUtil.addHandler(buttons[0],'click',Operation.LeftIn);
            EventUtil.addHandler(buttons[1],'click',Operation.RightIn);
            EventUtil.addHandler(buttons[2],'click',Operation.LeftOut);
            EventUtil.addHandler(buttons[3],'click',Operation.RightOut);
            EventUtil.addHandler(buttons[4],'click',function(){numbers=[];Operation.render();});
            EventUtil.addHandler(buttons[5],'click',Operation.Search);
            EventUtil.addHandler( Operation.showArray,'click',function(event){
                event=EventUtil.getEvent(event);
                var target=EventUtil.getTarget(event);
                Operation.DeleteNumber(target);
            });
        }
        init();
    }
)();