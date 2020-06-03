<template>
    <div class="footer">
        <div id="time-box">
            <el-progress :stroke-width="2"
                         :percentage="percentage"
                         :color="customColor"
                         :format="format"
            ></el-progress>
            <audio :src="this.url" ref="Audio" controls="controls"></audio>
        </div>

        <el-button-group class="video-btn-box">
            <el-button title="上一首" class="video-btn" icon="el-icon-caret-left"></el-button>
            <el-button title="播放" class="video-btn" @click="play" v-show="playState" icon="el-icon-video-play"></el-button>
            <el-button title="暂停" v-show="!playState" @click="play" class="video-btn" icon="el-icon-video-pause"></el-button>
            <el-button title="下一首" class="video-btn" icon="el-icon-caret-right"></el-button>
        </el-button-group>
    </div>
</template>

<script>
    export default {
        name: "footer",
        data(){
            return{
                percentage:0,//时间长度
                customColor: '#409eff',//颜色
                playState:true,
                url:'http://m7.music.126.net/20200603170552/14f19f1adb78226b45a305e1a101fa83/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
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
            },
        }
    }
</script>

<style scoped lang="scss">
    .footer{
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