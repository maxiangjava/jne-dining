(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-addressManage"],{"03a4":function(t,a,e){"use strict";e.r(a);var s=e("e844"),i=e("7c69");for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);e("9258");var r,d=e("f0c5"),o=Object(d["a"])(i["default"],s["b"],s["c"],!1,null,"b3e87ba4",null,!1,s["a"],r);a["default"]=o.exports},"7c69":function(t,a,e){"use strict";e.r(a);var s=e("d4ea"),i=e.n(s);for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);a["default"]=i.a},9258:function(t,a,e){"use strict";var s=e("dab6"),i=e.n(s);i.a},c39b:function(t,a,e){var s=e("24fb");a=s(!1),a.push([t.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */uni-page-body[data-v-b3e87ba4]{background:#f8f8f8;padding-top:%?16?%}.row[data-v-b3e87ba4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;padding:0 %?30?%;height:%?110?%;background:#fff}.row .tit[data-v-b3e87ba4]{-webkit-flex-shrink:0;flex-shrink:0;width:%?120?%;font-size:%?30?%;color:#303133}.row .input[data-v-b3e87ba4]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?30?%;color:#303133}.row .icon-shouhuodizhi[data-v-b3e87ba4]{font-size:%?36?%;color:#909399}.default-row[data-v-b3e87ba4]{margin-top:%?16?%}.default-row .tit[data-v-b3e87ba4]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.default-row uni-switch[data-v-b3e87ba4]{-webkit-transform:translateX(%?16?%) scale(.9);transform:translateX(%?16?%) scale(.9)}.add-btn[data-v-b3e87ba4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;width:%?690?%;height:%?80?%;margin:%?60?% auto;font-size:%?32?%;color:#fff;background-color:#fa436a;-webkit-border-radius:%?10?%;border-radius:%?10?%;-webkit-box-shadow:1px 2px 5px rgba(219,63,96,.4);box-shadow:1px 2px 5px rgba(219,63,96,.4)}body.?%PAGE?%[data-v-b3e87ba4]{background:#f8f8f8}',""]),t.exports=a},d4ea:function(t,a,e){"use strict";(function(t){var s=e("4ea4");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("96cf");var i=s(e("1da1")),n={data:function(){return{addressData:{userId:sessionStorage.getItem("userId"),userName:"",mobile:"",title:"天心电子世界",address:"",detail:"",latitude:"",longitude:"",defaultStatus:!1}}},onLoad:function(a){t.log(a);var e="新增收货地址";"edit"===a.type&&(e="编辑收货地址",this.addressData=JSON.parse(a.data)),t.log(this.addressData),this.manageType=a.type,uni.setNavigationBarTitle({title:e})},methods:{switchChange:function(a){t.log(a.detail),this.addressData.defaultStatus=a.detail.value,t.log(this.addressData.defaultStatus)},chooseLocation:function(){var a=this;uni.chooseLocation({success:function(e){t.log(e),a.addressData.address=e.address,a.addressData.title=e.name,a.addressData.latitude=e.latitude,a.addressData.longitude=e.longitude}})},confirm:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e=t.addressData,e.userName){a.next=4;break}return t.$api.msg("请填写收货人姓名"),a.abrupt("return");case 4:if(/(^1[3|4|5|7|8][0-9]{9}$)/.test(e.mobile)){a.next=7;break}return t.$api.msg("请输入正确的手机号码"),a.abrupt("return");case 7:if(e.title){a.next=10;break}return t.$api.msg("请确定所在位置"),a.abrupt("return");case 10:if(e.detail){a.next=13;break}return t.$api.msg("请填写门牌号信息"),a.abrupt("return");case 13:return a.next=15,t.$http("/address/save",t.addressData,"POST");case 15:t.$api.msg("地址".concat("edit"==t.manageType?"修改":"添加","成功")),uni.navigateBack();case 17:case"end":return a.stop()}}),a)})))()}}};a.default=n}).call(this,e("5a52")["default"])},dab6:function(t,a,e){var s=e("c39b");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var i=e("4f06").default;i("0d47058a",s,!0,{sourceMap:!1,shadowMode:!1})},e844:function(t,a,e){"use strict";var s;e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return s}));var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"row b-b"},[e("v-uni-text",{staticClass:"tit"},[t._v("联系人")]),e("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"收货人姓名","placeholder-class":"placeholder"},model:{value:t.addressData.userName,callback:function(a){t.$set(t.addressData,"userName",a)},expression:"addressData.userName"}})],1),e("v-uni-view",{staticClass:"row b-b"},[e("v-uni-text",{staticClass:"tit"},[t._v("手机号")]),e("v-uni-input",{staticClass:"input",attrs:{type:"number",placeholder:"收货人手机号码","placeholder-class":"placeholder"},model:{value:t.addressData.mobile,callback:function(a){t.$set(t.addressData,"mobile",a)},expression:"addressData.mobile"}})],1),e("v-uni-view",{staticClass:"row b-b"},[e("v-uni-text",{staticClass:"tit"},[t._v("位置")]),e("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"收货人地址","placeholder-class":"placeholder"},model:{value:t.addressData.title,callback:function(a){t.$set(t.addressData,"title",a)},expression:"addressData.title"}}),e("v-uni-text",{staticClass:"yticon icon-shouhuodizhi",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.chooseLocation.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticClass:"row b-b"},[e("v-uni-text",{staticClass:"tit"},[t._v("地址")]),e("v-uni-input",{staticClass:"input",attrs:{type:"text",placeholder:"楼号、门牌","placeholder-class":"placeholder"},model:{value:t.addressData.detail,callback:function(a){t.$set(t.addressData,"detail",a)},expression:"addressData.detail"}})],1),e("v-uni-view",{staticClass:"row default-row"},[e("v-uni-text",{staticClass:"tit"},[t._v("设为默认")]),e("v-uni-switch",{attrs:{checked:t.addressData.defaultStatus,color:"#fa436a"},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.switchChange.apply(void 0,arguments)}}})],1),e("v-uni-button",{staticClass:"add-btn",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.confirm.apply(void 0,arguments)}}},[t._v("提交")])],1)},n=[]}}]);