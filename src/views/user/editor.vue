<template>
  <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
    <el-form-item label="名字" prop="name">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="phone">
      <el-input v-model="form.phone" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="mail">
      <el-input v-model="form.mail" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" auto-complete="off">
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
import { addUser } from '@/api/user'
import { phoneValidator, passwordValidator, nameValidator } from '@/utils/validate'

export default {
  name: 'UserEditor',
  props: {
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
      },
      //新增界面数据
      form: {
        name: '',
        phone: '',
        mail: '',
        password: ''
      }
    }
  },
  methods: {
    cancel: function () {
      this.$refs['form'].resetFields();
      if (this.onAction) {
        this.onAction(false)
      }
    },
    submit: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('确认添加吗？', '提示', {}).then(() => {
            this.loading = true;
            let user = Object.assign({}, this.form);
            addUser(user).then((res) => {
              this.loading = false;
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$refs['form'].resetFields();
              if (this.onAction) {
                this.onAction(true)
              }
            });
          });
        }
      });
    }
  }
}
</script>
