<template>
    <div>
        <Rich-Text ref="RichText"></Rich-Text>
        <el-row>
            <el-col style="text-align:center;margin-top:10px;">
                <el-button type="primary" @click="getInnerHTML"> 获取内容 </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import RichText  from '../components/RichText';
export default {
    name:'Rich',
    components:{
        RichText    
    },
    data(){
        return {
            
        }
    },
    created(){
      
    },
    mounted(){
       
    },
    methods:{
        getInnerHTML(){
            this.$refs.RichText.getHtml()

            console.log(this.$refs.RichText.getHtml())
        }
    }
}
</script>
<style lang="scss" scoped>
 
 </style> 
