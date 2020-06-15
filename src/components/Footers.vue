<template>
    <div class="Footers">
        <div id="time-box">
            <el-progress :stroke-width="2"
                         :percentage="percentage"
                         :color="customColor"
                         :format="format"
            ></el-progress>
            <audio :src="playUrl" ref="Audio"></audio>
        </div>

        <el-button-group class="video-btn-box">
            <el-button title="上一首" class="video-btn" icon="el-icon-caret-left"></el-button>
            <el-button title="播放" class="video-btn" @click="playMusic" v-show="playState" icon="el-icon-video-play"></el-button>
            <el-button title="暂停" v-show="!playState" @click="playMusic" class="video-btn" icon="el-icon-video-pause"></el-button>
            <el-button title="下一首" class="video-btn" icon="el-icon-caret-right"></el-button>
        </el-button-group>
    </div>
</template>

<script>
    export default {
        name: "Footers",
        props:{
            playUrl:String
        },
        data(){
            return{
                percentage:0,//进度条
                customColor: '#409eff',//颜色
                playState:true,
                currentTime:"0:0",//音乐播放位置
                duration:"0:0",//音乐长度
            }
        },
        mounted() {
            console.log(this.$store.state.name);
        },
        methods:{
            format(percentage) {
                return percentage === 100 ? '' : `${this.currentTime}/${this.duration}`;
            },
            playMusic(){
                if (this.$refs.Audio.paused === true && this.playUrl !== ''){
                    this.$refs.Audio.play();//播放歌曲
                    this.playState = false;//切换暂停按钮
                    this.duration = this.formatSeconds(this.$refs.Audio.duration);
                    this.time()
                }else if (this.$refs.Audio.paused === false){
                    this.$refs.Audio.pause();
                    this.playState = true;
                }
            },
            //获取音乐时间
            time(){
                let _this = this;
                let time = setInterval(function () {
                  /*  _this.currentTime = _this.$refs.Audio.currentTime;*/
                    _this.percentage = (parseInt(_this.$refs.Audio.currentTime) / parseInt(_this.$refs.Audio.duration)) * 100;
                    _this.currentTime = _this.formatSeconds(_this.$refs.Audio.currentTime);
                    console.log(_this.percentage);
                    if (_this.$refs.Audio.ended === true || _this.playState === true){
                        _this.$refs.Audio.pause();
                        _this.playState = true;
                        clearInterval(time)
                    }
                },1000)
            },
            //转换音乐的时间
            formatSeconds(value) {
                let theTime = parseInt(value);// 秒
                let middle= 0;// 分
                let hour= 0;// 小时
                if(theTime > 60) {
                    middle= parseInt(theTime/60);
                    theTime = parseInt(theTime%60);
                    if(middle> 60) {
                        hour= parseInt(middle/60);
                        middle= parseInt(middle%60);
                    }
                }
                let result = ""+parseInt(middle)+":"+parseInt(theTime);
                /*if(middle > 0) {
                    result = ""+parseInt(middle)+":"+result;
                }*/
                if(hour> 0) {
                    result = ""+parseInt(hour)+":"+result;
                }

                return result;
            }

        }
    }
</script>

<style scoped lang="scss">
    .Footers{
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
</style>