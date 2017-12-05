<template>
  <div> </div>
</template>

<script>
import { buy } from '@/api/counter'

export default {
 data() {
   return {}
 },
 methods: {
   buyPackage: function () {
     buy(this.$route.params.type).then((data) => {
       WP.click(data)
       WP.err = function(err) {
         this.$message({message: '支付失败', type: 'warning'})
         console.log(err);
       }
     }).catch(() => {})
   }
 }
}
</script>
