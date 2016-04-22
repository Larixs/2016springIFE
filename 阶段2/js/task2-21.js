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
        Function.prototype.bind=function(obj){//用于绑定事件中的this对象转换
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
            render:function(){//渲染并绑定mouseenter和mouseleave事件
                var fragment=document.createDocumentFragment();
                this.show.innerHTML="";
                for(var i=0;i<this.array.length;i++)
                {
                    var tmp=document.createElement("div");
                    tmp.className="cell";
                    tmp.title=tmp.innerHTML=this.array[i];
                    tmp.id=i+this.areaNumber;
                    fragment.appendChild(tmp);
                    EventUtil.addHandler( tmp,'mouseenter',this.DeleteTip);
                    EventUtil.addHandler( tmp,'mouseleave',this.RemoveDeleteTip);
                }
                this.show.appendChild(fragment);
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
            DeleteTip:function(){
                this.innerHTML="<span>点击删除</span>"+this.innerHTML;
                this.style.backgroundColor="black";
            },
            RemoveDeleteTip:function(){
                this.removeChild(this.firstChild);
                this.style.backgroundColor="rgba(45, 45, 67, 0.73)";
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

            Hobby.prototype.getContent=function (){//每个框对输入的要求不一样，所以没有添加到textIn原型里而是分别添加

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
                var tmp=this.in.value;
                var reg=/[0-9a-zA-Z\u4E00-\u9FA5]+\s/m;
                var match = reg.exec(tmp);
                    if (match) this.addToArray(match[0]);
            };
            Tag.prototype.tagInit=function(){
                this.init();
                EventUtil.addHandler(this.in,'input',this.getContent.bind(this));//ie以外的浏览器，不用onchange
                EventUtil.addHandler(this.in,'propertychange',this.getContent.bind(this));//兼容ie
            };

            var tag=new Tag("tag",0);
            tag.tagInit();
        }
        createHobby();
        createTag();
    }
)();
