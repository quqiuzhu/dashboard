<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-select @change="search" v-model="params.status" placeholder="支付状态" style="width: 90px;">
				    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-model="uid" placeholder="用户ID" style="width: 140px;"></el-input>
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
		<el-table :data="items" highlight-current-row v-loading="loading"  style="width: 100%;">
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
			<el-table-column type="expand">
			 <template scope="props">
				 <el-form label-position="left" inline class="order-expand">
					 <el-form-item label="用户ID">
						 <span>{{ props.row.owner.id }}</span>
					 </el-form-item>
					 <el-form-item label="手机号">
						 <span>{{ props.row.owner.phone }}</span>
					 </el-form-item>
					 <el-form-item label="支付时间">
						 <span>{{ props.row.pay_time }}</span>
					 </el-form-item>
				 </el-form>
			 </template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-button :disabled="scope.row.status?true:false" size="small" @click="updatePrice(scope.$index, scope.row)">改价</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="pageChanged" :page-size="params.count" :total="total" :current-page="page" style="float:right;">
			</el-pagination>
		</el-col>

		<el-dialog title="更改订单价格"
		v-model="priceVisible"
		:close-on-click-modal="false">
			<order-price
				:onAction="onPriceUpdate"
				:order="editingOrder">
			</order-price>
		</el-dialog>
	</section>
</template>

<script>
import OrderPrice from './price'
import { orders } from '@/api/counter'

export default {
	components: { OrderPrice },
  data() {
    return {
      params: {
        uid: 0,
				status: 0,
				start: 0,
				count: 10
      },

			options: [{
					value: 0,
					label: '全部'
				},{
          value: 1,
          label: '已支付'
        }
			],

			uid: '',
      items: [],
      total: 0,
			page: 1,
      loading: false,

			priceVisible: false,
			editingOrder: {},
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

		//改价
		updatePrice: function (index, row) {
			this.priceVisible = true;
      this.editingOrder = {
				id: row.id,
				price: row.price
			};
		},
		onPriceUpdate: function (valueChanged) {
      this.priceVisible = false;
			if (valueChanged) {
				this.fetchOrders()
			}
    },

    //搜索
    search() {
			this.params.start = 0
      this.params.uid = this.uid
			this.fetchOrders()
    }
  }
}
</script>

<style lang="scss" scope>
.order-expand {
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
