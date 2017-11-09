<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input v-model="keywords" placeholder="ID/名字/电话"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="search" v-on:click="search"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="plus" @click="add"/>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button @click="fetchUsers"><i class="fa fa-refresh" aria-hidden="true"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="items" highlight-current-row v-loading="loading" @selection-change="selectionChanged" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="80" sortable>
			</el-table-column>
			<el-table-column prop="name" label="名字" width="120">
			</el-table-column>
			<el-table-column label="会员" width="100">
				<template scope="scope">
					<el-popover
					  ref="member-popover"
					  placement="top-start"
					  :title="scope.row.name"
					  width="200"
					  trigger="hover"
					  :content="scope.row.member.level ? '到期时间:' + scope.row.member.expire_time : '还未开通会员'">
					</el-popover>

					<i class="fa fa-diamond" aria-hidden="true" :style="scope.row.member.level ? 'color:red;' : 'color:gray;'"></i>

					<el-button type="text" size="small" v-popover:member-popover @click="member(scope.$index, scope.row)">
						{{scope.row.member.level ? '续费' : '升级'}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="160">
			</el-table-column>
			<el-table-column prop="regTime" label="注册时间" min-width="180">
			</el-table-column>
			<el-table-column type="expand">
			 <template scope="props">
				 <el-form label-position="left" inline class="user-expand">
					 <el-form-item label="邮箱">
						 <span>{{ props.row.mail }}</span>
					 </el-form-item>
					 <el-form-item label="登录时间">
						 <span>{{ props.row.logTime }}</span>
					 </el-form-item>
				 </el-form>
			 </template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" @click="resetPassword(scope.$index, scope.row)">重置</el-button>
					<el-button type="danger" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.selection.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="pageChanged" :page-size="params.count" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog :title="editeTitle"
		v-model="editerVisible"
		:close-on-click-modal="false">
			<user-editor
				:onAction="onEdited"
				:user="editingUser">
			</user-editor>
		</el-dialog>

		<el-dialog title="会员升级/续费"
		v-model="memberVisible"
		:close-on-click-modal="false">
			<user-member
				:onAction="onMemberUpdate"
				:uid="memberUid">
			</user-member>
		</el-dialog>

	</section>
</template>

<script>
import UserEditor from './editor'
import UserMember from './member'
import { users, removeUser, batchRemoveUser, updatePassword } from '@/api/user'

export default {
	components: { UserEditor, UserMember },
  data() {
    return {
      params: {
        search: '',
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
			editingUser: {},

			memberVisible: false,
			memberUid: 0
    }
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.loading = true
      users(this.params).then(data => {
        this.items = data.list
				this.total = data.total
        this.loading = false
      }).catch(() => {
				this.loading = false;
			})
    },

    pageChanged(page) {
      this.params.start = (page - 1) * this.params.count;
      this.fetchUsers()
    },

		selectionChanged: function (selection) {
			this.selection = selection;
		},

    //搜索
    search() {
			this.params.start = 0
      this.params.search = this.keywords
			this.fetchUsers()
    },

		//添加
		add: function () {
			this.editeTitle = '添加'
      this.editerVisible = true
			this.editingUser = Object.assign({}, {name: '', phone: '', mail: '', password: ''})
    },

		//编辑
    edit: function (index, row) {
			this.editeTitle = '编辑'
      this.editerVisible = true;
      this.editingUser = Object.assign({}, row);
    },
		onEdited: function (valueChanged) {
      this.editerVisible = false;
			if (!this.editingUser.id) {
				this.page = 1
				this.params.search = ''
			}
			if (valueChanged) {
				this.fetchUsers()
			}
    },

		//会员升级
		member: function (index, row) {
			this.memberUid = row.id;
			this.memberVisible = true;
		},
		onMemberUpdate: function (valueChanged) {
			this.memberVisible = false;
			if (valueChanged) {
				this.fetchUsers()
			}
		},

		//重置密码
		resetPassword: function (index, row) {
			let message = '确认要重置「' + row.name + '」的密码吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        updatePassword(row.id, '123456').then((res) => {
          this.loading = false;
          this.$message({message: '重置密码成功', type: 'success'})
        }).catch(() => {
					this.loading = false;
	      })
      })
		},

		//删除
    remove: function (index, row) {
			let message = '确认要删除「' + row.name + '」吗?'
      this.$confirm(message, '提示', {
        type: 'warning'
      }).then(() => {
        this.loading = true;
        removeUser(row.id).then((res) => {
          this.loading = false;
          this.$message({message: '删除成功', type: 'success'})
					fetchUsers()
        }).catch(() => {
					this.loading = false;
	      })
      })
    },

    //批量删除
    batchRemove: function () {
      var ids = this.selection.map(item => item.id).toString()
			var names = this.selection.map(item => item.name).toString()
			let message = '确认要删除「' + names + '」吗?'
      this.$confirm(message, '提示', {
  			type: 'warning'
      }).then(() => {
        this.loading = true;
        batchRemoveUser(ids).then((res) => {
          this.loading = false;
          this.$message({message: '删除成功', type: 'success'})
					this.fetchUsers()
        }).catch(() => {
						this.loading = false;
	      })
      })
    }
  }
}
</script>

<style lang="scss" scope>
.user-expand {
	font-size: 0;
	label {
    width: 90px;
    color: #99a9bf;
  }
	.el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
