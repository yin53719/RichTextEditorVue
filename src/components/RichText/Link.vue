<template>
    <div>
        <el-form ref="form"  label-width="80px">
                <el-row>
                    <el-col>
                        <el-form-item label="" :label-width="'1px'">
                            <el-input placeholder="请输入文本"  v-model="form.textValue"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="" :label-width="'1px'">
                            <el-input placeholder="请输入地址"  v-model="form.href"></el-input>
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
                textValue:'',
                href:'',
                option:'',
                type:''
            },
        }
    },
    created(){
        this.form = this.injectData;
    },
    methods:{
        getData(){
            return this.form
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
