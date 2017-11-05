<template>
  <el-form :model="member" label-width="80px" ref="form">
    <el-form-item label="天数" prop="days">
      <el-input-number v-model="member.days" type="" auto-complete="off" :min="30" :step="15" :max="1000"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateMember } from '@/api/user'

export default {
  name: 'UserMember',
  props: {
    uid: {
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
      member: {
        days: 30
      }
    }
  },
  methods: {
    cancel: function () {
      this.$refs['form'].resetFields();
      this.onAction(false)
    },
    submit: function () {
      this.loading = true;
      updateMember(this.uid, this.member.days).then((res) => {
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
