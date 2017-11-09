<template>
  <el-form :model="order" label-width="80px" ref="form">
    <el-form-item label="价格" prop="price">
      <el-input-number v-model="order.price" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateOrderPrice } from '@/api/counter'

export default {
  name: 'OrderPrice',
  props: {
    order: {
      type: Object,
      default: function () {
        return {
          id: 0,
          price: 60
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
    }
  },
  methods: {
    cancel: function () {
      this.$refs['form'].resetFields();
      this.onAction(false)
    },
    submit: function () {
      this.loading = true;
      let order = {price: parseInt(this.order.price * 100)}
      updateOrderPrice(this.order.id, order).then((res) => {
        this.loading = false;
        this.$message({message: '修改成功',type: 'success'});
        this.onAction(true)
        this.$refs['form'].resetFields();
      }).catch(() => {
        this.loading = false
      });
    }
  }
}
</script>
