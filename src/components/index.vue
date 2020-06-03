<template>
    <div class="index">
        <el-container>
            <el-header class="header">
                <Login class="login"></Login>
                <div class="search-box">
                    <el-input v-model="search" clearable placeholder="大家都在搜 许嵩">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-header>
            <el-container>
                <el-aside width="100px" class="aside">Aside</el-aside>
                <el-container>
                    <el-main class="main-box">Main</el-main>
                </el-container>

            </el-container>
            <el-footer>
                <div id="time-box">
                    <el-progress :stroke-width="2"
                                 :percentage="percentage"
                                 :color="customColor"
                                 :format="format"
                    ></el-progress>
                    <audio src="../assets/music.mp3" ref="Audio" controls="controls"></audio>
                </div>
                <el-button-group class="video-btn-box">
                    <el-button title="上一首" class="video-btn" icon="el-icon-caret-left"></el-button>
                    <el-button title="播放" class="video-btn" @click="play" v-show="playState" icon="el-icon-video-play"></el-button>
                    <el-button title="暂停" v-show="!playState" @click="play" class="video-btn" icon="el-icon-video-pause"></el-button>
                    <el-button title="下一首" class="video-btn" icon="el-icon-caret-right"></el-button>
                </el-button-group>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Login from '../views/login'
    export default {
        name: 'index',
        props: {
            msg: String
        },
        components:{
            Login
        },
        data(){
            return{
                search:'',//搜索框

                percentage:0,//时间长度
                customColor: '#409eff',//颜色
                playState:true,

                currentTime:0,
                duration:0,
            }
        },
        methods:{
            format(percentage) {
                return percentage === 100 ? '' : '';
            },
            play(){
                console.log(this.$refs.Audio.paused);
                if (this.$refs.Audio.paused === true){
                    this.$refs.Audio.play();//播放歌曲
                    this.playState = false;//切换暂停按钮
                    this.duration= this.$refs.Audio.duration;
                    let _this = this;
                    setInterval(function() {
                        this.currentTime = _this.$refs.Audio.currentTime;
                        console.log(_this.currentTime);
                    },1000)

                }else if (this.$refs.Audio.paused === false){
                    this.$refs.Audio.pause();
                    this.playState = true;
                }
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
        .el-footer{
            display: flex;
            #time-box{
                padding-top:13px;
                width: 45%;
            }
            .video-btn-box{
                .video-btn{
                    margin: 0 10px;
                    padding: 0;
                    font-size: 42px;
                    color: #eee;
                    border: none!important;
                    background-color: rgba(0,0,0,0);
                }
                .video-btn:hover{
                    color: white;
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
</style>
