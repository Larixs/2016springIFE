(function(){
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
        var target=null;
        Function.prototype.bind=function(obj){
            var _this=this;
            return function(){
                _this.apply(obj,arguments);
            }
        };

        function TextIn(name,areaNumber){
            this.name=name;
            this.in=document.getElementById(name+"In");
            this.show=document.getElementById(name+"Show");
            this.clear=document.getElementById(name+"Clear");
            this.array=[];
            this.areaNumber=areaNumber*10;
        }
        TextIn.prototype={
            constructor:TextIn,
            render:function(){
                var innerHTML="";
                for(var i=0;i<this.array.length;i++)
                    innerHTML+="<div class='cell' title='"+this.array[i]+"' id='"+(i+this.areaNumber)+"'>"+this.array[i]+"</div>";
                this.show.innerHTML=innerHTML;
                this.in.value="";
            },
          addToArray:function(array){
                    if(this.array.indexOf(array)==-1)//去重
                    {
                        if(this.array.length>9)//控制数组长度，若此时长度为10，则先进的先出
                            this.array.shift();
                        this.array.push(array);
                    }
                this.render();
            },
            allClear:function(){
                this.array=[];
                this.render();
            },
          init:function(){
                EventUtil.addHandler(this.clear,'click',this.allClear.bind(this));
                EventUtil.addHandler( this.show,'click',function(event){
                    event=EventUtil.getEvent(event);
                    target=EventUtil.getTarget(event);
                });
              EventUtil.addHandler( this.show,'click',this.DeleteNumber.bind(this));
            },
           DeleteNumber:function() {
                if(target.id<(11+this.areaNumber)&&target.id>(this.areaNumber-1))
                {this.array.splice((target.id-this.areaNumber),1);
                    this.render();
                }
            }
        };


        function createHobby(){
            function Hobby(name,areaNumber){//属性继承
                TextIn.call(this,name,areaNumber);
                this.confirm=document.getElementById(name+"Confirm");
            }
            Hobby.prototype=new TextIn();//方法继承
            Hobby.constructor=Hobby;

            Hobby.prototype.getContent=function (){

                var tmp=this.in.value.trim();
                var reg=/[0-9a-zA-Z\u4E00-\u9FA5]+/g;
                var match=null;
                do {
                    match = reg.exec(tmp);
                    if (match) this.addToArray(match[0]);
                }while(match)
            };
            Hobby.prototype.hobbyInit=function(){
                this.init();
                EventUtil.addHandler(this.confirm,'click',this.getContent.bind(this));
            };

            var hobby=new Hobby("hobby",1);
            hobby.hobbyInit();
        }
        function createTag(){
            function Tag(name,areaNumber){//属性继承
                TextIn.call(this,name,areaNumber);
            }
            Tag.prototype=new TextIn();//方法继承
            Tag.constructor=Tag;

            Tag.prototype.getContent=function (){

                var tmp=this.in.value.trim();
                var reg=/[0-9a-zA-Z\u4E00-\u9FA5]+/g;
                var match=null;
                do {
                    match = reg.exec(tmp);
                    if (match) this.addToArray(match[0]);
                }while(match)
            };
            Tag.prototype.tagInit=function(){
                this.init();
                EventUtil.addHandler(this.in,'input',test);
            };

            var tag=new Tag("tag",0);
            tag.tagInit();
        }
        createHobby();
        createTag();
    }
)();
function test()
{
    alert("yes");
}