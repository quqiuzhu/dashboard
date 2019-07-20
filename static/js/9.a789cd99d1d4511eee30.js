webpackJsonp([9,13],{BYhr:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-form",{ref:"form",attrs:{model:t.order,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"价格",prop:"price"}},[r("el-input-number",{attrs:{min:1},model:{value:t.order.price,callback:function(e){t.order.price=e},expression:"order.price"}})],1),t._v(" "),r("el-form-item",[r("el-button",{nativeOn:{click:function(e){t.cancel(e)}}},[t._v("取消")]),t._v(" "),r("el-button",{attrs:{type:"primary",loading:t.loading},nativeOn:{click:function(e){t.submit(e)}}},[t._v("提交")])],1)],1)},i=[],n={render:a,staticRenderFns:i};e.a=n},MAz6:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[r("el-form",{attrs:{inline:!0}},[r("el-form-item",[r("el-select",{staticStyle:{width:"90px"},attrs:{placeholder:"支付状态"},on:{change:t.search},model:{value:t.params.status,callback:function(e){t.params.status=e},expression:"params.status"}},t._l(t.options,function(t){return r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),r("el-form-item",[r("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"用户ID"},model:{value:t.uid,callback:function(e){t.uid=e},expression:"uid"}})],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",icon:"search"},on:{click:t.search}})],1),t._v(" "),r("el-form-item",{staticStyle:{float:"right"}},[r("el-button",{on:{click:t.fetchOrders}},[r("i",{staticClass:"fa fa-refresh",attrs:{"aria-hidden":"true"}})])],1)],1)],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:t.items,"highlight-current-row":""}},[r("el-table-column",{attrs:{prop:"id",label:"ID",width:"80"}}),t._v(" "),r("el-table-column",{attrs:{label:"用户",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.owner.name))])]}}])}),t._v(" "),r("el-table-column",{attrs:{prop:"title",label:"标题",width:"120"}}),t._v(" "),r("el-table-column",{attrs:{prop:"price",label:"价格",width:"80"}}),t._v(" "),r("el-table-column",{attrs:{prop:"create_time",label:"创建时间",width:"180"}}),t._v(" "),r("el-table-column",{attrs:{label:"状态","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.status?"已支付":"未支付"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-form",{staticClass:"order-expand",attrs:{"label-position":"left",inline:""}},[r("el-form-item",{attrs:{label:"用户ID"}},[r("span",[t._v(t._s(e.row.owner.id))])]),t._v(" "),r("el-form-item",{attrs:{label:"手机号"}},[r("span",[t._v(t._s(e.row.owner.phone))])]),t._v(" "),r("el-form-item",{attrs:{label:"支付时间"}},[r("span",[t._v(t._s(e.row.pay_time))])])],1)]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{disabled:!!e.row.status,size:"small"},on:{click:function(r){t.updatePrice(e.$index,e.row)}}},[t._v("改价")])]}}])})],1),t._v(" "),r("el-col",{staticClass:"toolbar",attrs:{span:24}},[r("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"prev, pager, next","page-size":t.params.count,total:t.total,"current-page":t.page},on:{"current-change":t.pageChanged}})],1),t._v(" "),r("el-dialog",{attrs:{title:"更改订单价格","close-on-click-modal":!1},model:{value:t.priceVisible,callback:function(e){t.priceVisible=e},expression:"priceVisible"}},[r("order-price",{attrs:{onAction:t.onPriceUpdate,order:t.editingOrder}})],1)],1)},i=[],n={render:a,staticRenderFns:i};e.a=n},"V7/b":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("tJ8z"),i=r("BYhr"),n=r("VU/8"),o=n(a.a,i.a,null,null,null);e.default=o.exports},"e+iX":function(t,e,r){"use strict";function a(t){r("eiJu")}Object.defineProperty(e,"__esModule",{value:!0});var i=r("pnLg"),n=r("MAz6"),o=r("VU/8"),l=a,s=o(i.a,n.a,l,null,null);e.default=s.exports},eiJu:function(t,e,r){var a=r("r7v0");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r("rjj0")("056b7110",a,!0)},pnLg:function(t,e,r){"use strict";var a=r("V7/b"),i=r("yEme");e.a={components:{OrderPrice:a.default},data:function(){return{params:{uid:0,status:0,start:0,count:10},options:[{value:0,label:"全部"},{value:1,label:"已支付"}],uid:"",items:[],total:0,page:1,loading:!1,priceVisible:!1,editingOrder:{}}},created:function(){this.fetchOrders()},methods:{fetchOrders:function(){var t=this;this.loading=!0,r.i(i.c)(this.params).then(function(e){t.items=e.list,t.total=e.total,t.loading=!1}).catch(function(){t.loading=!1})},pageChanged:function(t){this.params.start=(t-1)*this.params.count,this.fetchOrders()},updatePrice:function(t,e){this.priceVisible=!0,this.editingOrder={id:e.id,price:e.price}},onPriceUpdate:function(t){this.priceVisible=!1,t&&this.fetchOrders()},search:function(){this.params.start=0,this.params.uid=this.uid,this.fetchOrders()}}}},r7v0:function(t,e,r){e=t.exports=r("FZ+f")(!0),e.push([t.i,".order-expand{font-size:0}.order-expand label{width:70px;color:#99a9bf}.order-expand .el-form-item{margin-right:0;margin-bottom:0;width:33%}","",{version:3,sources:["/home/travis/build/quqiuzhu/dashboard/src/views/order/index.vue"],names:[],mappings:"AACA,cACE,WAAa,CACd,AACD,oBACI,WAAY,AACZ,aAAe,CAClB,AACD,4BACI,eAAgB,AAChB,gBAAiB,AACjB,SAAW,CACd",file:"index.vue",sourcesContent:["\n.order-expand {\n  font-size: 0;\n}\n.order-expand label {\n    width: 70px;\n    color: #99a9bf;\n}\n.order-expand .el-form-item {\n    margin-right: 0;\n    margin-bottom: 0;\n    width: 33%;\n}\n"],sourceRoot:""}])},tJ8z:function(t,e,r){"use strict";var a=r("yEme");e.a={name:"OrderPrice",props:{order:{type:Object,default:function(){return{id:0,price:60}}},onAction:{type:Function,default:null}},data:function(){return{loading:!1}},methods:{cancel:function(){this.$refs.form.resetFields(),this.onAction(!1)},submit:function(){var t=this;this.loading=!0;var e={price:parseInt(100*this.order.price)};r.i(a.b)(this.order.id,e).then(function(e){t.loading=!1,t.$message({message:"修改成功",type:"success"}),t.onAction(!0),t.$refs.form.resetFields()}).catch(function(){t.loading=!1})}}}},yEme:function(t,e,r){"use strict";function a(t,e){return r.i(o.a)({url:"/counter/buy",method:"post",data:{package:t,channel:e}})}function i(t){return r.i(o.a)({url:"/counter/orders",method:"get",params:t})}function n(t,e){return r.i(o.a)({url:"/order/"+t,method:"put",data:e})}e.a=a,e.c=i,e.b=n;var o=r("Vo7i")}});
//# sourceMappingURL=9.a789cd99d1d4511eee30.js.map