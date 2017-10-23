<template>
  <el-col :span="24" class="breadcrumb-container">
    <strong class="title">{{$route.name}}</strong>
    <el-breadcrumb separator="/" class="breadcrumb-inner">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
        <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
        <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-col>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && (first.name !== '首页' || first.path !== '')) {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .breadcrumb-container {
    margin-bottom: 20px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
      font-size: 20px;
    }
    .breadcrumb-inner {
      float: right;
      display: inline-block;
    }
}
</style>
