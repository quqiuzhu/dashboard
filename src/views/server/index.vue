<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input :on-icon-click="search" v-model="keywords" placeholder="服务器"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="search" v-on:click="search"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="plus" @click="add"/>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button @click="fetchServers"><i class="fa fa-refresh" aria-hidden="true"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="items" highlight-current-row v-loading="loading" @selection-change="selectionChanged" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column label="ID" width="60">
				<template scope="scope">
					<span></span>
					<el-popover
					  ref="popover"
					  placement="top"
					  width="184"
						height="184"
					  trigger="click">
					  <qrcode-vue
							:value="ss_uri(scope.row)"
							size="160" level="H">
						</qrcode-vue>
					</el-popover>
					<el-button type="text" v-popover:popover>
						{{ scope.row.id }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="hostname" label="服务器" width="140">
			</el-table-column>
			<el-table-column prop="port" label="端口" width="80">
			</el-table-column>
			<el-table-column prop="method" label="加密方式" width="120">
			</el-table-column>
			<el-table-column prop="passwd" label="密码" width="160">
			</el-table-column>
			<el-table-column label="状态" min-width="80">
				<template scope="scope">
					<span>{{ status(scope.row.status) }}</span>
				</template>
			</el-table-column>
			<el-table-column type="expand">
			 <template scope="props">
				 <el-form label-position="left" inline class="server-expand">
					 <el-form-item label="创建时间">
						 <span>{{ props.row.create_time }}</span>
					 </el-form-item>
				 </el-form>
			 </template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="edit(scope.$index, scope.row)" :disabled="scope.row.status == 3">编辑</el-button>
					<el-button :type="scope.row.status == 0 ? 'primary':'warning'" size="small" @click="scope.row.status == 0 ? online(scope.$index, scope.row) : offline(scope.$index, scope.row)">
						{{ scope.row.status == 0 ? '上线' : '下线' }}
					</el-button>
					<el-button type="danger" size="small" @click="remove(scope.$index, scope.row)" :disabled="scope.row.status != 0">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button :type="isSelectionOnline ? 'warning':'primary'" @click="isSelectionOnline ? batchOffline() : batchOnline()" :disabled="!(isSelectionOnline || isSelectionOffline)">{{isSelectionOnline ? '批量下线' : isSelectionOffline ? '批量上线' : '上线下线'}}</el-button>
			<el-button type="danger" @click="batchRemove" :disabled="!isSelectionOffline">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="pageChanged" :page-size="params.count" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog :title="editeTitle"
		v-model="editerVisible"
		:close-on-click-modal="false">
			<server-editor
				:onAction="onEdited"
				:server="editingServer">
			</server-editor>
		</el-dialog>
	</section>
</template>

<script>
import ServerEditor from './editor'
import QrcodeVue from 'qrcode.vue'

import { servers, addServer, removeServer,
	batchRemoveServers, onlineServer, batchOnlineServers,
	offlineServer, batchOfflineServers } from '@/api/server'
import { server_status } from '@/utils/index'

export default {
	components: { ServerEditor, QrcodeVue },
  data() {
    return {
      params: {
        hostname: '',
				start: 0,
				count: 10
      },

			keywords: '',
      items: [],
      total: 0,
			page: 1,
      loading: false,
      selection: [],

			editeTitle: '',
			editerVisible: false,
			editingServer: {},
    }
  },
	computed: {
		isSelectionOffline: function () {
			var offline = true
			for (var i = 0; i < this.selection.length; i++) {
				if (this.selection[i].status != 0) {
					offline = false
					break
				}
			}
			return this.selection.length!=0 && offline
		},
		isSelectionOnline: function () {
			var online = true
			for (var i = 0; i < this.selection.length; i++) {
				if (this.selection[i].status == 0) {
					online = false
					break
				}
			}
			return this.selection.length!=0 && online
		}
	},
  created() {
    this.fetchServers()
  },
  methods: {
    fetchServers() {
      this.loading = true
      servers(this.params).then(data => {
        this.items = data.list
				this.total = data.total
        this.loading = false
      }).catch(() => {
				this.loading = false;
			})
    },

    pageChanged(page) {
      this.params.start = (page - 1) * this.params.count;
      this.fetchServers()
    },

		selectionChanged: function (selection) {
			this.selection = selection;
		},

    //搜索
    search() {
			this.params.start = 0
      this.params.hostname = this.keywords
			this.fetchServers()
    },

		//添加
		add: function () {
			this.editeTitle = '添加'
      this.editerVisible = true
			this.editingServer = Object.assign({}, {
				hostname: '',
				port: 443,
				method: 'aes-256-cfb',
				passwd: Math.random().toString(36).substr(2) })
    },

		//编辑
		edit: function (index, row) {
			this.editeTitle = '编辑'
			this.editerVisible = true;
			this.editingServer = Object.assign({}, row);
		},
		onEdited: function (valueChanged) {
			this.editerVisible = false;
			if (!this.editingServer.id) {
				this.page = 1
				this.params.hostname = ''
			}
			if (valueChanged) {
				this.fetchServers()
			}
		},

		//上线
		online: function (index, row) {
			let message = '确认要上线「' + row.hostname + ':' + row.port + '」吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        onlineServer(row.id).then((res) => {
          this.loading = false;
          this.$message({message: '上线成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
					this.loading = false;
	      })
      })
		},

		//批量上线
		batchOnline: function () {
			var ids = this.selection.map(item => item.id).toString()
			var names = this.selection.map(item => item.hostname + ':' + item.port).toString()
			let message = '确认要上线「' + names + '」吗?'
      this.$confirm(message, '提示', {
  			type: 'warning'
      }).then(() => {
        this.loading = true;
        batchOnlineServers(ids).then((res) => {
          this.loading = false;
          this.$message({message: '上线成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
						this.loading = false;
	      })
      })
		},

		//下线
		offline: function (index, row) {
			let message = '确认要下线「' + row.hostname + ':' + row.port + '」吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        offlineServer(row.id).then((res) => {
          this.loading = false;
          this.$message({message: '下线成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
					this.loading = false;
	      })
      })
		},

		//批量下线
		batchOffline: function () {
			var ids = this.selection.map(item => item.id).toString()
			var names = this.selection.map(item => item.hostname + ':' + item.port).toString()
			let message = '确认要下线「' + names + '」吗?'
      this.$confirm(message, '提示', {
  			type: 'warning'
      }).then(() => {
        this.loading = true;
        batchOfflineServers(ids).then((res) => {
          this.loading = false;
          this.$message({message: '下线成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
						this.loading = false;
	      })
      })
		},

		//删除
    remove: function (index, row) {
			let message = '确认要删除「' + row.hostname + ':' + row.port +  '」吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        removeServer(row.id).then((res) => {
          this.loading = false;
          this.$message({message: '删除成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
					this.loading = false;
	      })
      })
    },

    //批量删除
    batchRemove: function () {
      var ids = this.selection.map(item => item.id).toString()
			var names = this.selection.map(item => item.hostname + ':' + item.port).toString()
			let message = '确认要删除「' + names + '」吗?'
      this.$confirm(message, '提示', {
  			type: 'warning'
      }).then(() => {
        this.loading = true;
        batchRemoveServers(ids).then((res) => {
          this.loading = false;
          this.$message({message: '删除成功', type: 'success'})
					this.fetchServers()
        }).catch(() => {
						this.loading = false;
	      })
      })
    },

		//工具类
		status: server_status,
		ss_uri: function (server) {
			var uri = server.method + ":" + server.passwd + "@" + server.hostname + ":" + server.port
			return "ss://" + btoa(uri)
		}
  }
}
</script>

<style lang="scss" scope>
.server-expand {
	font-size: 0;
	label {
    width: 70px;
    color: #99a9bf;
  }
	.el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
}
</style>
