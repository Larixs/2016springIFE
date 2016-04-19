(function(){
        var text=document.getElementById("numbersIn");
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
                return event.target || event.srcElement;},
            removeHandler:function(element,type,handler){
                if(element.removeEventListener){
                    element.removeEventListener(type,handler,false);
                }else if(element.detachEvent){
                    element.detachEvent("on"+type,handler);
                }else{
                    element["on"+type]=null;
                }
            }
        }
        function checkNumber(){
            var number=text.value.trim();
            var reg =/^\d+$/;
            if(numbers.length<61)
            {
                if(!reg.test(number)||number<10||number>100){
                    alert("请输入10~100的整数！");
                    return false;
                }
                else return number;
            } else {
                alert("输入的元素已经有60个了，不能再输入了~")
                return false;
            }
        }
        var Operation=
        {
            showArray:document.getElementById("showArray"),
            render:function(){
                var innerHTML="";
                for(var i=0;i<numbers.length;i++)
                {
                     innerHTML+="<div class='cell' title='"+numbers[i]+"' id='"+i+"'style='height:"+numbers[i]*4+"px;left:"+(12*i+30)+"px;'></div>";
                }
                Operation.showArray.innerHTML=innerHTML;
            },
            LeftIn:function () {
                var number = checkNumber();
                if (number)
                    numbers.unshift(number);
                Operation.render();
            },
            RightIn:function() {
                var number = checkNumber();
                if (number) numbers.push(number);
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
            Sort: function() {
                var tmp = 0, length = numbers.length, i = 0, j = 0;
                EventUtil.removeHandler(buttons[0],'click',Operation.LeftIn);
                EventUtil.removeHandler(buttons[1],'click',Operation.RightIn);
                EventUtil.removeHandler(buttons[2],'click',Operation.LeftOut);
                EventUtil.removeHandler(buttons[3],'click',Operation.RightOut);
                EventUtil.removeHandler(buttons[5],'click',Operation.Random);
                var timer = setInterval(function () {
                    if (i < length) {
                        if (j < length - i) {
                            if (numbers[j] > numbers[j + 1]) {
                                tmp = numbers[j];
                                numbers[j] = numbers[j + 1];
                                numbers[j + 1] = tmp;
                            }
                            j++;
                        } else {
                            j = 0;i++
                        }
                    } else {
                        init();
                        clearInterval(timer);
                    }
                    Operation.render();
                }, 50);
            },
            Random:function (){
                for(var i=0;i<30;i++)
                {
                    numbers[i]=Math.round(Math.random()*100);
                }
                Operation.render();
            }
        }
        function init(){
            EventUtil.addHandler(buttons[0],'click',Operation.LeftIn);
            EventUtil.addHandler(buttons[1],'click',Operation.RightIn);
            EventUtil.addHandler(buttons[2],'click',Operation.LeftOut);
            EventUtil.addHandler(buttons[3],'click',Operation.RightOut);
            EventUtil.addHandler(buttons[4],'click',Operation.Sort);
            EventUtil.addHandler(buttons[5],'click',Operation.Random);
            EventUtil.addHandler(buttons[6],'click',function(){numbers=[];Operation.render();});
            EventUtil.addHandler( Operation.showArray,'click',function(event){
                event=EventUtil.getEvent(event);
                var target=EventUtil.getTarget(event);
                Operation.DeleteNumber(target);
            });
        }
        init();
}
)();