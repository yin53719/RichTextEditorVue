<template>
    <div>
        <el-form ref="form"  label-width="80px">
                <el-row>
                    <el-col>
                        <el-form-item label="" :label-width="'1px'">
                             <video :src="form.src" controls="controls" autoplay="true" >您的浏览器不支持 video 标签。</video>
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
                src:'https://oss-qa.roewe.com.cn/f_a74a4e0c-ff2e-4f3c-b9fc-e81463c22935.mp4',
                type:'VIDEO'
            },
        }
    },
    created(){
        this.form = this.injectData;
        this.form.src = 'https://oss-qa.roewe.com.cn/f_a74a4e0c-ff2e-4f3c-b9fc-e81463c22935.mp4'
    },
    methods:{
        getData(){
            return this.form
        }
    }
}
</script>

<style lang="scss" scoped>
   video{
       width: 100%;
       max-height: 200px;
   }
</style>
