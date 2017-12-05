<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button @click="$router.go(-1)"> <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </el-button>
				</el-form-item>
        <el-form-item>
					<el-button
					:type="server.owner? 'danger' : 'primary'"
					@click="server.owner ? unassign() : assign()">
						 {{server.owner ? "解除分配": "分配"}}
					</el-button>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button @click="fetchServer"><i class="fa fa-refresh" aria-hidden="true"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

    <!--服务账号信息-->
    <el-col :span="24">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <qrcode-vue
              :value="ss_uri(server)"
              class="qrcode"
              size="188" level="H">
            </qrcode-vue>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <el-form :model="server" label-width="80px">
              <el-form-item label="服务器" prop="hostname">
                <el-input v-model="server.hostname" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="端口" prop="port">
                <el-input v-model="server.port" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="加密方式" prop="method">
                <el-input v-model="server.method" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="passwd">
                <el-input v-model="server.passwd" :type="passwordVisible ? 'text' : 'password'" :readonly="true">
                  <template slot="append">
                    <i :class="passwordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'" @click="passwordVisible = !passwordVisible" aria-hidden="true"></i>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
		</el-col>

		<!--用户信息-->
		<el-col :span="24" class="toolbar" v-if="server.owner">
			<div >
		    <span style="line-height: 36px;">会员「{{server.owner.name}}」正在使用</span>
		    <el-button style="float: right;" type="warning" :disable="assignAble">取消分配</el-button>
		  </div>
		</el-col>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
      <span>ID {{ server.id }} / {{ status(server.status) }}</span>
		</el-col>

		<el-dialog title="分配"
		v-model="assignVisible"
		:close-on-click-modal="false">
			<server-assign
				:onAction="onServerUpdate"
				:sid="assignSid">
			</server-assign>
		</el-dialog>
	</section>
</template>

<script>
import ServerEditor from './editor'
import QrcodeVue from 'qrcode.vue'
import ServerAssign from './assign'

import { server, assginServer, unassginServer } from '@/api/server'
import { server_status } from '@/utils/index'

export default {
	components: { ServerEditor, QrcodeVue, ServerAssign },
  data() {
    return {
      server: {
        hostname: '',
        port: '',
        method: '',
        passwd: ''
      },
      passwordVisible: false,
			assignSid: 0,
			assignVisible: false
    }
  },
  created() {
    this.fetchServer()
  },
  methods: {
    fetchServer() {
      server(this.$route.params.id).then(data => {
        this.server = data
      }).catch(() => {

			})
    },
		//分配
		assign: function () {
			this.assignSid = this.server.id
			this.assignVisible = true
		},
		onServerUpdate: function (valueChanged) {
			this.assignVisible = false
			if (valueChanged) {
				this.fetchServer()
			}
		},

		//解除分配
		unassign: function () {
			let message = '确认要解除分配「' + server.hostname + ':' + server.port + '」吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        onlineServer(row.id).then((res) => {
          this.loading = false;
          this.$message({message: '解除分配成功', type: 'success'})
					this.fetchServer()
        }).catch(() => {
					this.loading = false;
	      })
      })
		},

		//工具类
		status: server_status,
		ss_uri: function (server) {
      if (!server.hostname) return ;
			var uri = server.method + ":" + server.passwd + "@" + server.hostname + ":" + server.port
			return "ss://" + btoa(uri)
		}
  }
}
</script>

<style lang="scss" scope>
.grid-content {
    border-radius: 4px;
    height: 220px;
    padding: 16px;
    background: #F9FAFC;
  	border:1px solid #dfe6ec;
  	margin: 12px 0px;

  	.el-form-item {
  		margin-bottom: 10px;
  	}
    .qrcode {
      text-align: center;
    }
}
</style>
