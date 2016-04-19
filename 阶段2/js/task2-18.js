(function(){
        var text=document.getElementById("numbersIn");
        var showArray=document.getElementById("showArray");
       // var numberArray=[];
        function addHandler(element,type,handler)
        {
            if(addEventListener)
            {
                element.addEventListener(type,handler,false);
            }else if(attachEvent){
                element.attachEvent("on"+type,handler);
            }else{
                element["on"+type]=handler;
            }
        }
        function getEvent(event){
            return event?event:window.event;
        }
        function getTarget(event){
            return event.target||event.srcElement;
        }
        function checkNumber(){
            var number=text.value.trim();
            var reg =/^\d+$/;
            if(!reg.test(number)){
                alert("请输入一个整数！");
                return false;
            }
            else return number;
        }
        function createCell(number){
            var tmp=document.createElement("div");
            tmp.className="cell";
            tmp.innerHTML=number;
            return tmp;
        }
        function LeftIn()
        {
            var number=checkNumber();
            if(number) {
                var tmp = createCell(number);
                if (showArray.children.length != 0)
                    showArray.insertBefore(tmp, showArray.firstChild);
                else showArray.appendChild(tmp);}
        }
        function RightIn()
        {
            var number=checkNumber();
            if(number) {
                var tmp=createCell(number);
                showArray.appendChild(tmp);}
        }
        function LeftOut(){
            var tmp=showArray.removeChild(showArray.firstChild);
            alert("弹出了"+tmp.innerHTML);
            tmp=null;
        }
        function RightOut(){
            var tmp=showArray.removeChild(showArray.lastChild);
            alert("弹出了"+tmp.innerHTML);
            tmp=null;
        }
        function DeleteNumber(target){
            showArray.removeChild(target);
        }
        function init(){
            var buttons=document.getElementsByTagName("button");
            addHandler(buttons[0],'click',LeftIn);
            addHandler(buttons[1],'click',RightIn);
            addHandler(buttons[2],'click',LeftOut);
            addHandler(buttons[3],'click',RightOut);
            addHandler(showArray,'click',function(event){
                event=getEvent(event);
                var target=getTarget(event);
                DeleteNumber(target);
            });
        }
        init();
}
)();