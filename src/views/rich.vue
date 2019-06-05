<template>
    <div>
        <div id="editor">
            <iframe :src="src" :style="style" ref="iframe">
            </iframe>
        </div>

       <el-button @click="setContent"> 光标位置插入文字 </el-button>
<el-button @click="getSelection"> 获取光标位置 </el-button>
       
    </div>
</template>

<script>

export default {
    name:'aaaaa',
    data(){
        return {
            ue:'',
            src:'./richContent.html',
            style:{
                width:'100%',
                height:'100%',
                border:'none'
            },
            index:0
        }
    },
    created(){
       window.richText = (t)=>{
           this.upContent(t)
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
        setContent(){
            this.index ++ ;
            let value = prompt()
            this.getRichText().setContent({
                'type':'a',
                'textValue':value,
                'href':'http://www.baidu.com'
            })
        },
        upContent(t){
            console.log(t)
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