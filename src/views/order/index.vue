<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input :on-icon-click="search" v-model="keywords" placeholder=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="search" v-on:click="search"/>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button @click="fetchOrders"><i class="fa fa-refresh" aria-hidden="true"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="items" highlight-current-row v-loading="loading" @selection-change="selectionChanged" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="80" sortable>
			</el-table-column>
			<el-table-column label="用户" width="120">
				<template scope="scope">
					<span>{{scope.row.owner.name}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="120">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="80">
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间" width="180">
			</el-table-column>
			<el-table-column label="状态" min-width="100">
				<template scope="scope">
					<span>{{scope.row.status ? '已支付' : '未支付'}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
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
	</section>
</template>

<script>
import { orders } from '@/api/counter'

export default {
	components: { },
  data() {
    return {
      params: {
        uid: 0,
				status: -1,
				start: 0,
				count: 10
      },

			keywords: '',
      items: [],
      total: 0,
			page: 1,
      loading: false,
      selection: []
    }
  },
  created() {
    this.fetchOrders()
  },
  methods: {
    fetchOrders() {
      this.loading = true
      orders(this.params).then(data => {
        this.items = data.list
				this.total = data.total
        this.loading = false
      }).catch(() => {
				this.loading = false;
			})
    },

    pageChanged(page) {
      this.params.start = (page - 1) * this.params.count;
      this.fetchOrders()
    },

		selectionChanged: function (selection) {
			this.selection = selection;
		},

    //搜索
    search() {
			this.params.start = 0
      this.params.search = this.keywords
			this.fetchOrders()
    }
  }
}
</script>
