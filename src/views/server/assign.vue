<template>
  <el-form label-width="80px" ref="form">
    <el-form-item label="用户ID" prop="uid">
      <el-input-number v-model="uid" auto-complete="off" :controls="false"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { assginServer } from '@/api/server'

export default {
  name: 'ServerAssign',
  props: {
    sid: {
      type: Number,
      default: 0
    },
    onAction: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      uid: 0
    }
  },
  methods: {
    cancel: function () {
      this.$refs['form'].resetFields();
      this.onAction(false)
    },
    submit: function () {
      this.loading = true;
      assginServer(this.sid, this.uid).then((res) => {
        this.loading = false;
        this.$message({message: '提交成功',type: 'success'});
        this.onAction(true)
        this.$refs['form'].resetFields();
      }).catch(() => {
        this.loading = false
      });
    }
  }
}
</script>
