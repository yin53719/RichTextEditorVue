
var richText = {
    _thisDom:{},
    init(){
       document.querySelector('body').focus()
       var first=document.querySelector("body").children;
        this.setPoint(first[0])

    },
    getSelection(){
        // 获取光标位置 anchorOffset 最后位置
        //文本 anchorNode
        //  选择位置开始的地方 focusOffset
        let sel = window.getSelection();
        return sel;
    },
    setPoint(node){
        //设置光标位置
        let pos = node.innerHTML.length?node.innerHTML.length-1:0;
       
        setTimeout(()=>{
            this.getSelection().collapse(node.parentNode,pos)
        },200)
       
    },
    setContent(content){
        if(content.type==='LINK'){
            utils.createLink(content,this._thisDom)
        }else if(content.type ==='IMG'){
            utils.createImg(content,this._thisDom)
        }else if(content.type ==='VIDEO'){
            utils.createVideo(content,this._thisDom)
        }
    },
    //判断在末尾插入还是中间插入
    getBoolInsertNode(){
        // 判断在结尾插入，还是中间插入
        return this.getSelection().anchorNode.textContent.length>this.getSelection().focusOffset
    },
    //更新内容
    updata(data){
        this._thisDom.innerHTML = data.textValue;
        window.parent.cancel()
    },
    //绑定事件
    addEvent(){
        let bObj = document.querySelector("body").children
        for(let i =0;i<bObj.length;i++){
            bObj[i].onclick= function (e){
                //向上发送事件
                window.parent.richText(e)
            }
        }
    },
    getContent(){
        return  document.querySelector('body').innerHTML
    }
}


    
 window.onload = function(){
    // richText.init();
 }   



