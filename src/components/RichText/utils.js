const utils = {
    insertAfter(newElement, targentElement) {
        //指定元素后面插入
        var parent = targentElement.parentNode;
        if (parent.lastChild == targentElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targentElement.nextSibling)
        }
    },
    // 创建链接
    createLink(content,_thisDoc){
        // let sel = this.getSelection();
        let a = _thisDoc.createElement('a');
            a.setAttribute('data-option',JSON.stringify(content))
            a.setAttribute('href',content.href)
            a.innerHTML=content.textValue;
            //给元素绑定事件
            a.onclick= (e)=>{
                window.parent.richText(e)
            }
            let children  = _thisDoc.querySelector('body').children;
            
            /* 
            * 如果内容为空
            */
            if(_thisDoc.querySelector('body').innerHTML ==='<p>​</p>'){
                console.log('编辑器内容为空---111')
                _thisDoc.querySelector('body').children[0].appendChild(a);
                return a;
            }
            /*
             * 特殊元素中间不允许复合插入内容
             * 比如
             *    1,a链接中间不允许再次插入a
             *    广告区域不允许再次插入广告
             * 
             */
            let nodeName = _thisDoc.getSelection().anchorNode.parentNode.nodeName;
            if(nodeName === 'A'){
                console.log('特殊元素后面插入---222')
                this.insertAfter(a,_thisDoc.getSelection().anchorNode);
                return a;
            }
            /* 
            * 没有匹配到特殊的
            * 执行任意位置插入
            */
            _thisDoc.getSelection().getRangeAt(0).insertNode(a);
            //折叠选区
            _thisDoc.getSelection().collapse(a,0);

            return a;
            console.log('文本中间位置插入---333');
           
    },
    createImg(content,_thisDoc){
        
        let img = new Image();
        img.ondblclick = (e)=>{
            //向上发送事件
            window.parent.richText(e)
        }
        img.src=content.src;
        img.setAttribute('data-option',JSON.stringify(content))
        let p = document.createElement('p');
        p.appendChild(img)
        _thisDoc.getSelection().getRangeAt(0).insertNode(p);
        _thisDoc.getSelection().collapse(p,0);
        return img;
    },
    createVideo(content,_thisDoc){
        let video = document.createElement('video');;
        video.ondblclick = (e)=>{
            e.preventDefault()
            //向上发送事件
            window.parent.richText(e)
        }
        video.setAttribute('controls','controls')
        video.setAttribute('autoplay','true')
        video.setAttribute('data-option',JSON.stringify(content))
        video.src=content.src;
        let p = document.createElement('p');
        p.appendChild(video);
        _thisDoc.getSelection().getRangeAt(0).insertNode(p);
        _thisDoc.getSelection().collapse(p,0);
        return video;
    }
}

export function getIframeWindow(id) {
    return document.getElementById(id).contentWindow   
} 
export function getIframeElement(id) {
    return document.getElementById(id).contentWindow.document   
} 

export function setPoint(_this,node){

    //设置光标位置
    if(node){
        let pos = node.innerHTML.length?node.innerHTML.length-1:0;
   
        setTimeout(()=>{
            _this.getSelection().collapse(node.parentNode,pos)
        },200)
    }else{
        _this.querySelector('body').focus()
        var first=_this.querySelector("body").children;
        setTimeout(()=>{
            _this.getSelection().collapse(_this.querySelector('body'),0)
        },200)
    }
}
export function pushContent(content,_thisDoc){
    if(content.type==='LINK'){
        utils.createLink(content,_thisDoc)
    }else if(content.type ==='IMG'){
        utils.createImg(content,_thisDoc)
    }else if(content.type ==='VIDEO'){
        utils.createVideo(content,_thisDoc)
    }
}
//更新内容
export function  updataContent(data,_thisElement){
    _thisElement.innerHTML = data.textValue;
    // window.parent.cancel()
}

export function fullScreen(){
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
        if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
        };
      return;
}
//退出全屏
export  function exitScreen(){
    if (document.exitFullscreen) {  
        document.exitFullscreen();  
    }  
    else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
    }  
    else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
    }  
    else if (document.msExitFullscreen) {  
        document.msExitFullscreen();  
    } 
    if(typeof cfs != "undefined" && cfs) {
        cfs.call(el);
    }
}

export default  utils 

