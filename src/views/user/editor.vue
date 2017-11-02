<template>
  <el-form :model="user" label-width="80px" :rules="formRules" ref="form">
    <el-form-item label="名字" prop="name">
      <el-input v-model="user.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="user.phone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="mail">
      <el-input v-model="user.mail" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" v-if="!user.id">
      <el-input type="password" v-model="user.password" auto-complete="off">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addUser, updateUser } from '@/api/user'
import { phoneValidator, passwordValidator, nameValidator } from '@/utils/validate'

export default {
  name: 'UserEditor',
  props: {
    user: {
      type: Object,
      default: function () {
        return {
          name: '',
          phone: '',
          mail: '',
          password: ''
        }
      }
    },
    onAction: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formRules: {
        name: [
          { required: true, trigger: 'blur', validator: nameValidator }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: phoneValidator }
        ],
        password: [
          { required: true, trigger: 'blur', validator: passwordValidator }
        ],
      }
    }
  },
  methods: {
    cancel: function () {
      this.$refs['form'].resetFields();
      this.onAction(false)
    },
    submit: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          let user = Object.assign({}, this.user);
          let api = user.id ? updateUser(user.id, user) : addUser(user)
          api.then((res) => {
            this.loading = false;
            this.$message({message: '提交成功',type: 'success'});
            this.onAction(true)
            this.$refs['form'].resetFields();
          }).catch(() => {
            this.loading = false
          });
        }
      });
    }
  }
}
</script>
