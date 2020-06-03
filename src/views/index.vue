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
                <el-aside width="200px" class="aside">Aside</el-aside>
                <el-container>
                    <el-main class="main-box">
                        <div class="list-box">
                            <ul>
                                <li v-for="item in musicList" :key="item.id">
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>
                        <div class="block">
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[30]"
                                    :page-size="30"
                                    layout="total, prev, pager, next, jumper"
                                    :total="this.total">
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
                currentPage:1,
                total:0,

                musicList:[]
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
                            this.musicList = res.data.result.songs;
                            this.total = res.data.result.songCount;
                            console.log(res);
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                }
            },
            handleCurrentChange(val) {
                this.$axios.get('/api/search',{
                    headers:{
                        withCredentials: true
                    },
                    params:{
                        keywords:this.search,
                        offset:(val -1)*30
                    }
                })
                    .then((res)=>{
                        this.musicList = res.data.result.songs;
                        this.total = res.data.result.songCount;
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
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
                height:750px;
                .list-box{
                    text-align: left;

                }
                .list-box ul>li{
                    list-style-type: none;
                    user-select: none;
                }
                .list-box ul>li:hover{
                    cursor: pointer;
                    color: #ffffff;
                }
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
