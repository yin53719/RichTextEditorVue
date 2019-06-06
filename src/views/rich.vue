<template>
    <div>
        <div id="editor">
            <iframe :src="src" :style="style" ref="iframe"></iframe>
        </div>

        <el-button @click="pushContent('LINK')"> 插入链接 </el-button>
        <el-button @click="pushContent('IMG')"> 插入图片 </el-button>
        <el-button @click="pushContent('VIDEO')"> 插入视频 </el-button>
        <el-dialog
            :visible="customerLinkDialogVisble"
            :title="title"
            width="60%"
            :append-to-body="true"
            >
            <component
                class="settingPanel"
                ref="settingPanel"
                :is="settingView"
                :inject-data="form"
            />
            <el-row>
                <el-col>
                    <el-button @click="cancel"> 取消 </el-button>
                    <el-button @click="save"> 保存 </el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import Link  from '../components/RichText/Link';
import IMG  from '../components/RichText/Img';
import VIDEO  from '../components/RichText/Video';
export default {
    name:'Rich',
    components:{
    },
    data(){
        return {
            ue:'',
            src:'./richText/richContent.html',
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
            settingView:''
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
        
    },
    methods:{
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
            this.customerLinkDialogVisble = true;
        },
        cancel(){
            this.customerLinkDialogVisble = false;
            this.isEdit = false;
        },
        save(){
            let data = this.$refs.settingPanel.getData();
            if(this.isEdit){
                this.getRichText().updata(data)
            }else{
                this.getRichText().setContent(data)
            }
        },
        getSelection(){
            console.log(this.getRichText().getSelection())
        }
    }
}
</script>
<style lang="scss" scoped>
    #editor{
       width:50% ;
       height:500px ;
       border: 1px solid #ccc ;
       margin: 20px ;
    }
 </style> 