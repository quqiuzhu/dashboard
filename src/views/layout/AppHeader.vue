<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="!sidebar.opened?'logo-collapse-width':'logo-width'">
      <span class="logo-img"><img src="static/logo.png" />
        {{!sidebar.opened?'':'不鸟科技'}}
      </span>
    </el-col>
    <el-col :span="10">
      <div class="tools" @click.prevent="toggleSideBar">
        <i class="fa fa-align-justify"></i>
      </div>
    </el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"><img src="https://avatars3.githubusercontent.com/u/5006296?s=460&v=4" /> 屈秋竹 </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ]),
      sidebar() {
        return this.$store.state.app.sidebar
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()  // 为了重新实例化vue-router对象 避免bug
        })
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
    line-height: 60px;
    .userinfo {
        text-align: right;
        padding-right: 18px;
        float: right;
        .userinfo-inner {
            cursor: pointer;
            color:#fff;
            img {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              margin: 10px 0px 10px 10px;
              float: right;
            }
        }
    }
    .logo {
        height:60px;
        font-size: 22px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 32px;
          float: left;
          margin: 14px 8px 14px 12px;
        }
        .txt {
          color:#fff;
        }
    }
    .logo-width{
        width:230px;
    }
    .logo-collapse-width{
        width:48px
    }
    .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
    }
}
</style>
