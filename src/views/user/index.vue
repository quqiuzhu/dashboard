<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addFormVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="80" sortable>
			</el-table-column>
			<el-table-column prop="name" label="名字" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="160">
			</el-table-column>
			<el-table-column prop="regTime" label="注册时间" min-width="180">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" :show-close="false">
			<user-editor
				:onAction="handleEditAction"
				:user="editingUser"
				:isEditing="true">
			</user-editor>
		</el-dialog>

		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false" :show-close="false">
			<user-editor :onAction = "handleAddAction"></user-editor>
		</el-dialog>

	</section>
</template>

<script>
import UserEditor from './editor'
import { users, removeUser, batchRemoveUser } from '@/api/user'

export default {
	components: { UserEditor },
  data() {
    return {
      filters: {
        name: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [],//列表选中列

			addFormVisible: false,//新增界面是否显示

      editFormVisible: false,//编辑界面是否显示
			editingUser: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      users(this.listQuery).then(data => {
        this.users = data.list
        this.listLoading = false
      })
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },

    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.filters.name
      };
      this.listLoading = true;
      //NProgress.start();
      getUserListPage(para).then((res) => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.listLoading = false;
        //NProgress.done();
      });
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        removeUser(row.id).then((res) => {
          this.listLoading = false;
          this.$message({message: '删除成功', type: 'success'})
        }).catch(() => {
					this.listLoading = false;
	      });
      })
    },
		handleAddAction: function (submitSuccess) {
      this.addFormVisible = false;
    },
		//显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editingUser = Object.assign({}, row);
    },
		handleEditAction: function (submitSuccess) {
      this.editFormVisible = false;
    },
    selsChange: function (sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString();
      this.$confirm('确认删除选中记录吗？', '提示', {
  			type: 'warning'
      }).then(() => {
        this.listLoading = true;
        batchRemoveUser(ids).then((res) => {
          this.listLoading = false;
          this.$message({message: '删除成功', type: 'success'})
        }).catch(() => {
						this.listLoading = false;
	      })
      })
    }
  }
}
</script>
