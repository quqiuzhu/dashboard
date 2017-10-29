<template>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">不鸟科技·管理系统</h3>
    <el-form-item prop="phone">
      <el-input type="text" v-model="loginForm.phone" auto-complete="off" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item prop="code" v-if="sms">
      <el-input type="text" v-model="loginForm.code" auto-complete="off" placeholder="验证码">
      <template slot="append">
        <el-button type="primary" class="send-button" @click="handleSendSms">
          {{text}}
        </el-button>
      </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-row :span="24">
      <el-col :span="20">
        <el-checkbox v-model="checked" checked class="remember">
          记住密码
        </el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-tooltip :content="'使用验证码登录'" placement="right">
          <el-switch v-model="sms" on-text="" off-text=""
           @change="clearSmsCode">
          </el-switch>
        </el-tooltip>
      </el-col>
    </el-row>
    </el-switch>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidPhone } from '@/utils/validate'
import { captcha } from '@/api/login'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }

    return {
      logining: false,
      loginForm: {
        phone: '',
        password: '',
        code: ''
      },
      loginRules: {
        phone: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      sms: false,
      smsSending: false,
      time: 60,
      checked: true
    };
  },
  computed: {
    text: function () {
      if(this.time == 0) {
        this.smsSending = false
      }
      return this.smsSending ? this.time + 's' : '获取验证码'
    }
  },
  methods: {
    clearSmsCode() {
      this.loginForm.code = ''
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.logining = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.logining = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSendSms() {
      if (!this.smsSending) {
        captcha(this.loginForm.phone).then(response => {

        })
        this.smsSending = true
        this.time = 60
        this.timer()
      }
    },
    timer () {
      if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .send-button {
      color: #20A0FF;
    }
  }
</style>
