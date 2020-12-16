<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.userName" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">位置</text>
			<input class="input" type="text" v-model="addressData.title" placeholder="收货人地址" placeholder-class="placeholder" />
			<text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text>
		</view>
		<view class="row b-b"> 
			<text class="tit">地址</text>
			<input class="input" type="text" v-model="addressData.detail" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaultStatus" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					userId:this.$store.state.userId,
					userName: '',
					mobile: '',
					title: '天心电子世界',
					address: '',
					detail: '',
					latitude: '',
					longitude: '',
					defaultStatus: false
				}
			}
		},
		onLoad(option){
			console.log(option)
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
			}
			console.log(this.addressData)
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				console.log(e.detail)
				this.addressData.defaultStatus = e.detail.value;
				console.log(this.addressData.defaultStatus)
			},
			
			//地图选择地址
			chooseLocation(){
				
				uni.chooseLocation({
					success: (data)=> {
						console.log(data)
						this.addressData.address = data.address;
						this.addressData.title = data.name;
						this.addressData.latitude = data.latitude;
						this.addressData.longitude = data.longitude;
					}
				})
			},
			
			//提交
			async confirm(){
				let data = this.addressData;
				if(!data.userName){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				if(!data.title){
					this.$api.msg('请确定所在位置');
					return;
				}
				if(!data.detail){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				await this.$http('/address/save',this.addressData,'POST');
				this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
