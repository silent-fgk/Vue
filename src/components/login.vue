<template>
    <div class="login">
        <div class="loginBox"><span @click="login(0)">登录</span>/<span @click="login(1)">注册</span></div>
        <transition name="el-zoom-in-top">
            <div class="popups-box" v-show="popupActive">
                <div class="popups">
                    <!--登录表单-->
                    <el-form class="demo-ruleForm"
                             :model="loginForm"
                             :rules="ruleLogin"
                             label-position="right"
                             label-width="0"
                             size="small"
                             status-icon
                             ref="loginForm"
                             v-show="this.loginActive === 0"
                    >
                        <span class="login-title">登录</span>
                        <el-form-item prop="phone">
                            <el-input autocomplete="off" placeholder="请输入11位手机号码" v-model="loginForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input type="password" placeholder="请输入密码" autocomplete="off" v-model="loginForm.pwd"></el-input>
                        </el-form-item>
                    </el-form>
                    <!--注册表单-->
                    <el-form class="demo-ruleForm"
                             :model="registerForm"
                             :rules="ruleRegister"
                             label-position="right"
                             label-width="0"
                             size="small"
                             status-icon
                             ref="registerForm"
                             v-show="this.loginActive === 1"
                    >
                        <span class="login-title">注册</span>
                        <el-form-item prop="phone">
                            <el-input autocomplete="off" placeholder="请输入11位手机号码" v-model="registerForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input type="password" placeholder="请输入密码" autocomplete="off" v-model="registerForm.pwd"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPwd">
                            <el-input type="password" placeholder="确认密码" autocomplete="off" v-model="registerForm.checkPwd"></el-input>
                        </el-form-item>
                        <el-form-item prop="code" class="code">
                            <el-input autocomplete="off" placeholder="输入验证码" v-model="registerForm.code"></el-input>
                            <el-button @click="reqCode()" type="primary">{{this.code}}</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="popups-btn">
                        <span class="returnLogin" @click="active(loginActive,'registerForm','loginForm')">{{this.text}}</span>
                        <el-button type="primary" @click="req('registerForm','loginForm')">确认</el-button>
                        <el-button @click="resetForm('registerForm','loginForm')">取消</el-button>
                    </div>

                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            /*登录表单校验规则*/
            let loginPhone = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error('请输入不能为空'));
                }else if (value.length !== 11){
                    callback(new Error('请输入11位手机号码'))
                }else {
                    callback()
                }
            };
            let loginPwd = (rule,value,callback) => {
                if (value.length !== 6){
                    callback(new Error('请输入6位密码'));
                }else {
                    callback()
                }
            };
            /*注册表单校验规则*/
            let registerPhone = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error('请输入不能为空'));
                }else if (value.length !== 11){
                    callback(new Error('请输入11位手机号码'))
                }else {
                    callback()
                }
            };
            let registerPwd = (rule,value,callback) => {
                if (value.length !== 6){
                    callback(new Error('请输入6位密码'));
                }else {
                    callback()
                }
            };
            let checkPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            let code = (rule,value,callback) => {
                if (value === ''){
                    callback(new Error('请输入验证码'))
                }else {
                    callback();
                }
            };
            return{
                popupActive:false,//弹窗状态 true开启  false关闭
                loginActive:0,//登录注册状态  0：登录  1：注册
                text:"",
                /*登录表单*/
                loginForm:{
                    phone:'',
                    pwd:''
                },
                /*登录表单校验*/
                ruleLogin:{
                    phone:[
                        {validator:loginPhone,trigger:'blur'}
                    ],
                    pwd:[
                        {validator:loginPwd,trigger:'blur'}
                    ]
                },
                /*注册表单*/
                registerForm:{
                    phone:'',
                    pwd:'',
                    checkPwd:'',
                    code:''
                },
                /*注册表单校验*/
                ruleRegister:{
                    phone:[
                        {validator:registerPhone,trigger:'blur'}
                    ],
                    pwd:[
                        {validator:registerPwd,trigger:'blur'}
                    ],
                    checkPwd:[
                        {validator:checkPwd,trigger:'blur'}
                    ],
                    code:[
                        {validator:code,trigger:'blur'}
                    ]
                },

                code:'获取验证码'
            }
        },
        mounted() {
        },
        methods:{
            /* 判断进入状态 0 为登录  1位注册*/
            login(id){
                this.popupActive = true;
                this.loginActive = id;
                if (this.loginActive === 0 ){
                    this.text = '前往注册';
                }else if (this.loginActive === 1){
                    this.text = '前往登录';
                }
            },
            /*切换登录注册*/
            active(loginActive,registerForm,loginForm){
                if (loginActive === 0){
                    this.loginActive = 1;
                    this.text = '前往登录';
                    this.$refs[registerForm].resetFields();
                }else if (loginActive === 1){
                    this.loginActive = 0;
                    this.text = '前往注册';
                    this.$refs[loginForm].resetFields();
                }
            },
            /*确认*/
            req(registerForm,loginForm){
                if ( this.loginActive === 0){
                    this.$refs[loginForm].validate((valid) =>{
                        if (valid === true){
                            this.$axios.post('/api/login/cellphone',{
                                headers:{
                                    withCredentials: true
                                },
                                params:{
                                    phone:this.loginForm.phone,
                                    password:this.loginForm.pwd
                                }
                            })
                            .then((res)=>{
                                console.log(res)
                            })
                            .catch((error)=>{
                                console.log(error);
                            })
                        }else {
                            return false
                        }
                    })

                }else if (this.loginActive === 1){
                    this.$refs[registerForm].validate((valid) =>{
                        if (valid){
                            console.log(valid);
                            console.log(this.registerForm);
                        }else {
                            return false
                        }
                    })
                }
            },
            /*取消*/
            resetForm(registerForm,loginForm) {
                this.popupActive = false;
                this.$refs[registerForm].resetFields();
                this.$refs[loginForm].resetFields();
            },
            reqCode(){
               /* this.$refs.registerForm.validate("phone",(valid) =>{
                    if (valid){
                        console.log(valid);
                    }else {
                        return false
                    }
                });*/
                if (this.registerForm.phone === '' || this.registerForm.phone.length !== 11){
                    console.log('输入不能为空');
                    this.code = "60s";
                }else {
                    this.$axios.get('/api/captcha/sent',{
                        headers:{
                            withCredentials: true
                        },
                        params:{
                            phone:this.registerForm.phone
                        }
                    })
                    .then((res)=>{

                        console.log(res);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
                }
            }
        }

    }
</script>

<style lang="scss" scoped>
    .loginBox{
        span{
            user-select: none;
            cursor: pointer;
        }
        span:hover{
            color: white;
        }
    }
    .popups-box{
        position: fixed;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        padding-top:10%;
        z-index: 999;
        .popups{
            width:300px;
            margin: 0 auto;
            padding: 10px;
            border-radius: 15px;
            background-color: white;
            .login-title{
                font-size: 22px;
                font-weight: bold;
                color: #409eff;
            }
            .code{
                display: flex;
                .el-input{
                    width: 67%;
                }
                .el-button{
                    margin-left: 5px;
                }
            }
            .popups-btn{
                text-align: left;
                .returnLogin{
                    cursor: pointer;
                    user-select: none;
                }
                .returnLogin:hover{
                    color: #dbdbdb;
                }
                .el-button{
                    float: right;
                    margin: 0 5px;
                }
            }
        }
    }
</style>