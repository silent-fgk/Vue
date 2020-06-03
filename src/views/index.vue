<template>
    <div class="index">
        <el-container>
            <el-header class="header">
                <Login class="login"></Login>
                <div class="search-box">
                    <el-input v-model="search"  @keyup.enter.native="captcha()" clearable placeholder="大家都在搜 许嵩">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-header>
            <el-container>
                <el-aside width="100px" class="aside">Aside</el-aside>
                <el-container>
                    <el-main class="main-box">
                        <ul>
                            <li></li>
                        </ul>
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="10"
                                    :page-size="10"
                                    layout="sizes, prev, pager, next, jumper"
                                    :total="400">
                            </el-pagination>
                        </div>
                    </el-main>

                </el-container>

            </el-container>
            <el-footer>
                <Footers></Footers>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Login from '../components/login';
    import Footers from "../components/Footers";
    export default {
        name: 'index',
        props: {
            msg: String
        },
        components:{
            Login,
            Footers
        },
        data(){
            return{
                search:'',//搜索框
                currentPage:1
            }
        },
        methods:{
            captcha(){
                if (this.search === ''){
                    console.log("空")
                }else {
                    this.$axios.get('/api/search',{
                        headers:{
                            withCredentials: true
                        },
                        params:{
                            keywords:this.search
                        }
                    })
                        .then((res)=>{
                            console.log(res)
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }
            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .index{
        width: 1200px;
        margin: 0 auto;
        text-align: center;
        background-color:rgba(255,255,255,.4);
        .header{
            height: 50px;
            line-height: 50px;
            display: flex;
            .login{
                width: 100px;
                font-size:13px;
            }
            .search-box{
               margin: 0 auto;
            }

        }
        .el-container{
            .aside{
            }
            .main-box{
                height:600px;
            }
        }

    }
</style>
<style>
    .el-input__inner{
        background-color:rgba(255,255,255,.7)!important;
    }
    .el-progress__text{
        color: white!important;
    }
    .el-progress-bar{
        width: 90%!important;
    }
    .el-dialog, .el-pager li{
        background-color: rgba(0,0,0,0)!important;
    }
    .el-pagination button:disabled{
        background:rgba(0,0,0,0)!important;
    }
    .el-pagination .btn-next, .el-pagination .btn-prev{
        background:rgba(0,0,0,0)!important;
    }
</style>
