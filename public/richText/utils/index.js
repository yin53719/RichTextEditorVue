var utils = {
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
    //判断在末尾插入还是中间插入
    getBoolInsertNode(){
        // 判断在结尾插入，还是中间插入
        return this.getSelection().anchorNode.textContent.length>this.getSelection().focusOffset
    },
    // 创建链接
    createLink(content,_thisDom){
        let sel = this.getSelection();
        let a = document.createElement('a');
            a.setAttribute('data-option',JSON.stringify(content))
            a.setAttribute('href',content.href)
            a.innerHTML=content.textValue;
            let children  = document.querySelector('body').children;

            console.log(children)
            debugger
            if(this.getBoolInsertNode() && document.querySelector('body').children.length>1){
                console.log('指定位置插入')
                this.getSelection().getRangeAt(0).insertNode(a);
                sel.removeAllRanges();
            }else{
                console.log('末尾插入')
                if(document.querySelector('body').children.length>1){
                    document.querySelector('body').appendChild(a)
                }else{
                    document.querySelector('body').children[0].appendChild(a)
                }
            }
            //给元素绑定事件
            a.ondblclick= (e)=>{
                //向上发送事件
                _thisDom = e.target;
                window.parent.richText(e)
            }
            
            this.setPoint(a)
            window.parent.cancel()
    },
    createImg(content,_thisDom){
        
        let img = new Image();
            img.ondblclick = (e)=>{
                //向上发送事件
                _thisDom = e.target;
                window.parent.richText(e)
            }
            img.src=content.src;
            console.log(content)
        document.querySelector('body').appendChild(img);
        window.parent.cancel()
    }
}