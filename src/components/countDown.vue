<template>
    <div class="countDown-box">
        <div class="countDown-item"
             :style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(d, width) + 'px', height: height + 'px' }"
             v-if="days">
            <div class="tui-countdown-time" :class="[scale ? 'countdown-scale' : '']"
                 :style="{ fontSize: size + 'px', color: color, lineHeight: size + 'px' }">
                {{ d }}
            </div>
        </div>
        <div
                class="countDown-time"
                :class="{ 'colon-pad': borderColor == 'transparent' }"
                :style="{ lineHeight: colonSize + 'px', fontSize: colonSize + 'px', color: colonColor }"
                v-if="days"
        >
            {{ isColon ? ':' : '天' }}
        </div>
        <div class="countDown-item"
             :style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(h, width) + 'px', height: height + 'px' }"
             v-if="hours">
            <div class="tui-countdown-time" :class="[scale ? 'countdown-scale' : '']"
                 :style="{ fontSize: size + 'px', color: color, lineHeight: size + 'px' }">
                {{ h }}
            </div>
        </div>
        <div
                class="countDown-time"
                :class="{ 'colon-pad': borderColor == 'transparent' }"
                :style="{ lineHeight: colonSize + 'px', fontSize: colonSize + 'px', color: colonColor }"
                v-if="hours"
        >
            {{ isColon ? ':' : '时' }}
        </div>
        <div
                class="countDown-item"
                :style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(i, width) + 'px', height: height + 'px' }"
                v-if="minutes"
        >
            <div class="tui-countdown-time" :class="[scale ? 'countdown-scale' : '']"
                 :style="{ fontSize: size + 'px', color: color, lineHeight: size + 'px' }">
                {{ i }}
            </div>
        </div>
        <div
                class="countDown-time"
                :class="{ 'colon-pad': borderColor == 'transparent' }"
                :style="{ lineHeight: colonSize + 'px', fontSize: colonSize + 'px', color: colonColor }"
                v-if="minutes"
        >
            {{ isColon ? ':' : '分' }}
        </div>
        <div
                class="countDown-item"
                :style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(s, width) + 'px', height: height + 'px' }"
                v-if="seconds"
        >
            <div class="tui-countdown-time" :class="[scale ? 'countdown-scale' : '']"
                 :style="{ fontSize: size + 'px', color: color, lineHeight: size + 'px' }">
                {{ s }}
            </div>
        </div>
        <div
                class="countDown-time"
                :class="{ 'colon-pad': borderColor == 'transparent' }"
                :style="{ lineHeight: colonSize + 'px', fontSize: colonSize + 'px', color: colonColor }"
                v-if="seconds && !isColon"
        >
            {{ unitEn ? 's' : '秒' }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "countDown",
        props: {
            //数字框宽度
            width: {
                type: Number,
                default: 12
            },
            //数字框高度
            height: {
                type: Number,
                default:0
            },
            //数字框border颜色
            borderColor: {
                type: String,
                default: '#fff'
            },
            //数字框背景颜色
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            //数字框字体大小
            size: {
                type: Number,
                default: 14
            },
            //数字框字体颜色
            color: {
                type: String,
                default: '#333'
            },
            //是否缩放 0.9
            scale: {
                type: Boolean,
                default: false
            },
            //冒号大小
            colonSize: {
                type: Number,
                default: 14
            },
            //冒号颜色
            colonColor: {
                type: String,
                default: '#333'
            },
            //剩余时间 (单位：秒)
            time: {
                type: Number,
                default: 0
            },
            //是否包含天
            days: {
                type: Boolean,
                default: false
            },
            //是否包含小时
            hours: {
                type: Boolean,
                default: true
            },
            //是否包含分钟
            minutes: {
                type: Boolean,
                default: true
            },
            //是否包含秒
            seconds: {
                type: Boolean,
                default: true
            },
            //单位用英文缩写表示 仅seconds秒数有效
            unitEn: {
                type: Boolean,
                default: false
            },
            //是否展示为冒号,false为文字
            isColon: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            time() {
                clearInterval(this.countdown);
                this.doLoop();
            }
        },
        data(){
            return {
                countdown: null,
                d: '0',
                h: '00',
                i: '00',
                s: '00'
            };
        },
        created() {
            this.doLoop();
        },

        beforeDestroy() {
            clearInterval(this.countdown);
            this.countdown = null;
        },
        methods: {
            getWidth(num, width) {
                return num > 99 ? (width / 2) * num.toString().length : width;
            },
            endOfTime() {
                clearInterval(this.countdown);
                this.countdown = null;
                this.$emit('end', {});
            },
            doLoop() {
                let seconds = this.time || 0;
                this.countDown(seconds);
                this.countdown = setInterval(() => {
                    seconds--;
                    if (seconds < 0) {
                        this.endOfTime();
                        return;
                    }
                    this.countDown(seconds);
                }, 1000);
            },
            countDown(seconds) {
                let [day, hour, minute, second] = [0, 0, 0, 0];
                if (seconds > 0) {
                    day = this.days ? Math.floor(seconds / (60 * 60 * 24)) : 0;
                    hour = this.hours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
                    minute = this.minutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
                    second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                } else {
                    this.endOfTime();
                }
                hour = hour < 10 ? '0' + hour : hour;
                minute = minute < 10 ? '0' + minute : minute;
                second = second < 10 ? '0' + second : second;
                this.d = day;
                this.h = hour;
                this.i = minute;
                this.s = second;
            }
        }
    }
</script>

<style scoped>
    .countDown-box {
        display: flex;
        align-items: center;
    }

    .countDown-box {
        display: flex;
        align-items: center;
    }

    .countDown-item {
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        border-radius: 6px;
        white-space: nowrap;
        transform: translateZ(0);
    }

    .tui-countdown-time {
        margin: 0;
        padding: 0;
    }

    .countDown-time {
        display: flex;
        justify-content: center;
        padding: 0 5px;
    }

    .colon-pad {
        padding: 0 !important;
    }

    .countdown-scale {
        transform: scale(0.9);
        transform-origin: center center;
    }
</style>