<template>
    <div class="index">
        <el-container>
            <el-header>

            </el-header>
            <el-container>
                <el-aside width="100px" class="aside">Aside</el-aside>
                <el-container>
                    <el-main class="mainBox">Main</el-main>
                </el-container>
            </el-container>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {
            msg: String
        },
        data(){
            return{

            }
        },
        methods(){

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .index{
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        background-color:rgba(0,0,0,.1);
        .aside{
        }
        .mainBox{
            height:600px;
        }
    }
</style>
