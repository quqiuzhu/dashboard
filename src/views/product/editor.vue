<template>
  <el-form :model="product" label-width="80px" :rules="formRules" ref="form">
    <el-form-item label="标题" prop="title">
      <el-input v-model="product.title" placeholder="标题(2-16个字)" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="product.description" placeholder="请输入套餐描述(8-255个字)" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="套餐时长">
    <el-select v-model="product.days" placeholder="请选择套餐时长">
      <el-option label="一年" value="365"></el-option>
      <el-option label="半年" value="180"></el-option>
      <el-option label="三个月" value="90"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="价格">
      <el-col :span="10">
      <el-input-number v-model="product.price" auto-complete="off" :min="0" :step="10" :max="1000"></el-input-number>
      </el-col>
      <el-col :span="11">
        <span>原价&nbsp;</span>
        <el-input-number v-model="product.orig_price" auto-complete="off" :min="30" :step="10" :max="1000"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="cancel">取消</el-button>
      <el-button type="primary" @click.native="submit"
      :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addProduct, updateProduct } from '@/api/product'
import { titleValidator, descriptionValidator } from '@/utils/validate'

export default {
  name: 'ProductEditor',
  props: {
    product: {
      type: Object,
      default: function () {
        return {
          title: '',
          description: '',
          price: 128,
          orig_price: 160,
          days: 365
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
      formRules: {
        title: [
          { required: true, trigger: 'blur', validator: titleValidator }
        ],
        description: [
          { required: true, trigger: 'blur', validator: descriptionValidator }
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
          let product = Object.assign({}, this.product);
          product.price = parseInt(product.price * 100)
          product.orig_price = parseInt(product.orig_price * 100)
          let api = product.id ? updateProduct(product.id, product) : addProduct(product)
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
