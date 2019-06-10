<template>
    <div>
        <div style="margin-bottom:10px;">
             <el-button @click="pushContent('LINK')"> 插入链接 </el-button>
            <el-button @click="pushContent('IMG')"> 插入图片 </el-button>
            <el-button @click="pushContent('VIDEO')"> 插入视频 </el-button>
        </div>
        <div id="richText" ref="richText">
            
        </div>
        <el-dialog
            :visible="customerLinkDialogVisble"
            :title="title"
            width="40%"
            :append-to-body="true"
            >
            <component
                class="settingPanel"
                ref="settingPanel"
                :is="settingView"
                :inject-data="form"
            />
            <el-row>
                <el-col style="text-align:center;">
                    <el-button @click="cancel"> 取消 </el-button>
                    <el-button type="primary" @click="save"> 保存 </el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import Link  from './Link';
import IMG  from './Img';
import VIDEO  from './Video';
import iframeStyle from './style';
import { getIframeElement ,setPoint ,pushContent,updataContent} from './utils'
export default {
    name:'Rich',
    components:{
    },
    data(){
        return {
            ue:'',
            style:{
                width:'100%',
                height:'100%',
                border:'none'
            },
            index:0,
            customerLinkDialogVisble:false,
            form:{
                textValue:'',
                href:'',
                option:'',
                type:''
            },
            isEdit:false,
            title:'',
            settingView:'',
            iframeId: 'richTextIframe' + new Date().getTime(),
            thisIframe:'',
            thisDom:''
        }
    },
    created(){
       window.richText = (t)=>{
           this.updateContent(t)
       }

        window.cancel = ()=>{
           this.cancel()
       }
    },
    mounted(){
        this.createIframe()
    },
    methods:{
        createIframe(){
            let iframe = document.createElement('iframe');
            iframe.setAttribute('style','border:none;width:100%;height:100%;');
            iframe.setAttribute('id',this.iframeId);

            this.$refs.richText.appendChild(iframe);
            let head = iframe.contentWindow.document.querySelector('head');
            let body = iframe.contentWindow.document.querySelector('body');
            let p = document.createElement('p');
                p.innerHTML = '&#8203;'
                body.appendChild(p);
            iframe.contentWindow.document.querySelector('body').setAttribute('contenteditable','true');
            let meta = document.createElement('meta');
            meta.setAttribute('charset','UTF-8');
            head.appendChild(meta);
            let style = document.createElement('style');
            style.innerHTML = iframeStyle
            head.appendChild(style);
            setPoint(getIframeElement(this.iframeId))
        },
        getRichText(){
            //获取富文本元素
            let richText = this.$refs.iframe.contentWindow.richText;
            return richText;
        },
        pushContent(type){
            this.isEdit = false;
            this.form = {
                type:type
            }
            if(type === 'LINK'){
                this.settingView = Link;
                this.title = '插入链接';
            }else if(type === 'IMG'){
                this.settingView = IMG;
                this.title = '插入图片';
            }else if(type === 'VIDEO'){
                this.settingView = VIDEO;
                this.title = '插入视频';
            }
            this.customerLinkDialogVisble = true;
        },
        updateContent(t){
            console.log(t);
            let type = t.target.nodeName;
            this.form = JSON.parse(t.target.dataset.option);
            if(type === 'LINK'){
                this.settingView = Link;
                this.title = '修改链接';
            }else if(type === 'IMG'){
                this.title = '修改图片';
            }else if(type === 'VIDEO'){
                this.title = '修改视频';
            }
            this.isEdit = true;
            this.thisDom = t.target
            this.customerLinkDialogVisble = true;
        },
        cancel(){
            this.customerLinkDialogVisble = false;
            this.isEdit = false;
        },
        save(){
            let data = this.$refs.settingPanel.getData();
            if(this.isEdit){
                updataContent(data,this.thisDom)
            }else{
                pushContent(data,getIframeElement(this.iframeId))
            }
            this.cancel()
        },
        getHtml(){
            //返回富文本内容
            return getIframeElement(this.iframeId).querySelector('body').innerHTML
        }
    }
}
</script>
<style lang="scss" scoped>
    #richText{
       width:50% ;
       height:500px ;
       border: 1px solid #ccc ;
       margin: 20px ;
       margin: 0 auto;
    }
 </style> 