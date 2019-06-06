<template>
    <div>
        <el-form ref="form"  label-width="80px">
                <el-row>
                    <el-col>
                        <el-form-item label="" :label-width="'1px'">
                             <img :src="form.src" alt="">
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
    </div>
</template>
<script>
export default {
    name:'createlink',
    props:{
        injectData:{
            type:Object,
            required:true
        }
    },
    data(){
        return {
            form:{
                src:'http://www.w3school.com.cn/i/eg_tulip.jpg',
                type:'IMG'
            },
        }
    },
    created(){
        this.form = this.injectData;
        this.form.src = 'http://www.w3school.com.cn/i/eg_tulip.jpg'
    },
    methods:{
        getData(){
            return this.form
        }
    }
}
</script>

<style lang="scss" scoped>
   img{
       width: 100%;
   }
</style>
