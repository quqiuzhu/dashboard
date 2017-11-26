<template>
  <el-form :model="server" label-width="80px" :rules="formRules" ref="form">
    <el-form-item label="服务器" prop="hostname">
      <el-input v-model="server.hostname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="端口" prop="port">
      <el-input-number v-model="server.port" auto-complete="off"></el-input-number>
    </el-form-item>
    <el-form-item label="加密方式" prop="method">
      <el-input v-model="server.method" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="passwd">
      <el-input v-model="server.passwd" :disabled="server.status == 3" auto-complete="off"></el-input>
      <span v-if="server.status == 3" style="color:gray;">
        如需更改密码，请先将其下线
      </span>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addServer, updateServer } from '@/api/server'
import { hostnameValidator, passwordValidator} from '@/utils/validate'

export default {
  hostname: 'ServerEditor',
  props: {
    server: {
      type: Object,
      default: function () {
        return { hostname: '', port: '', method: '', passwd: '' }
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
        hostname: [
          { required: true, trigger: 'blur', validator: hostnameValidator}
        ],
        passwd: [
          { required: true, trigger: 'blur', validator: passwordValidator}
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
          let server = Object.assign({}, this.server);
          let api = server.id ? updateServer(server.id, server) : addServer(server)
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
