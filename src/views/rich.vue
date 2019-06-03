<template>
    <div>
        <div id="editor">
            <iframe :src="src">

                sdfsdgf
            </iframe>
        </div>

       <el-button @click="handleGetPoint"> 获取光标位置 </el-button>
       <el-button @click="setContent"> 光标位置插入文字 </el-button>

    </div>
</template>

<script>
export default {
    name:'aaaaa',
    data(){
        return {
            ue:'',
            src:'./richContent.html'
        }
    },
    created(){
    //   window.UE.delEditor('editor');
    },
    mounted(){
        
    },
    methods:{
        handleGetPoint(){
            let textDom = window.document.getElementById('editor')
            let anchorNode = this.getSelection().anchorOffset

            console.log(anchorNode)

        },
        getSelection(){
            // 获取光标位置 anchorOffset 最后位置
            //文本 anchorNode
            //  选择位置开始的地方 focusOffset
            let sel = window.getSelection();
            console.log(sel)
            return sel;
        },
        setContent(content){
            this.getSelection().getRangeAt(0).insertNode(document.createTextNode("<p>插入的值</p>"))
        }
    }
}
</script>
<style lang="scss" scoped>
   #editor{
       width:50%;
       height:500px;
       border: 1px solid #ccc;
       margin: 20px;
   }
</style>