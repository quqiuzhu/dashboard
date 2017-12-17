<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" icon="plus" @click="add"/>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button @click="fetchProducts"><i class="fa fa-refresh" aria-hidden="true"></i></el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="items" highlight-current-row v-loading="loading" style="width: 100%;">
			<el-table-column prop="id" label="ID" width="80">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="120">
			</el-table-column>
			<el-table-column prop="description" label="描述" min-width="160">
			</el-table-column>
			<el-table-column prop="price" label="价格" width="80">
			</el-table-column>
			<el-table-column prop="orig_price" label="原价" width="80">
			</el-table-column>
			<el-table-column prop="days" label="时长(天)" width="100">
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="primary" @click="buyPackage">购买</el-button>
			<el-pagination layout="prev, pager, next" @current-change="pageChanged" :page-size="params.count" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog :title="editeTitle"
		v-model="editerVisible"
		:close-on-click-modal="false">
			<product-editor
				:onAction="onEdited"
				:product="editingProduct">
			</product-editor>
		</el-dialog>
	</section>
</template>

<script>
import ProductEditor from './editor'
import { products, removeProduct } from '@/api/product'
import { buy } from '@/api/counter'

export default {
	components: { ProductEditor },
  data() {
    return {
      params: {
				start: 0,
				count: 10
      },

      items: [],
      total: 0,
			page: 1,
      loading: false,

			editeTitle: '',
			editerVisible: false,
			editingProduct: {}
    }
  },
  created() {
    this.fetchProducts()
  },
  methods: {
    fetchProducts() {
      this.loading = true
      products(this.params).then(data => {
        this.items = data.list
				this.total = data.total
        this.loading = false
      }).catch(() => {
				this.loading = false;
			})
    },

    pageChanged(page) {
      this.params.start = (page - 1) * this.params.count;
      this.fetchProducts()
    },

		//添加
		add: function () {
			this.editeTitle = '添加'
			this.editerVisible = true
			this.editingProduct = Object.assign({}, {
				title: '',
				description: '',
				price: 128,
				orig_price: 160,
				days: 365
			})
		},

		//编辑
		edit: function (index, row) {
			this.editeTitle = '编辑'
			this.editerVisible = true;
			this.editingProduct = Object.assign({}, row);
		},
		onEdited: function (valueChanged) {
			this.editerVisible = false;
			if (!this.editingProduct.id) {
				this.page = 1
			}
			if (valueChanged) {
				this.fetchProducts()
			}
		},

		//删除
		remove: function (index, row) {
			let message = '确认要删除「' + row.title + '」吗?'
			this.$confirm(message, '提示', {
				type: 'warning'
			}).then(() => {
				this.loading = true;
				removeProduct(row.id).then((res) => {
					this.loading = false;
					this.$message({message: '删除成功', type: 'success'})
					fetchProducts()
				}).catch(() => {
					this.loading = false;
				})
			})
		},

		buyPackage: function () {
			buy('month', 'ali').then((data) => {
				this.loading = false;
				WP.click(data)
				WP.err = function(err) {
					this.$message({message: '支付失败', type: 'warning'})
					console.log(err);
				}
			}).catch(() => {
				this.loading = false;
			})
		}
  }
}
</script>
