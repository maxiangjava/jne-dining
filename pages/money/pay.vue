<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{data.money}}</text>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(1)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">餐卡支付</text>
					<text>可用余额 ¥{{balance}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' /></radio>
				</label>
			</view>
		</view>
		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				balance:0,
				data:{
					money:0,
					desc:'',
					arriveTime:'',
					addressId:'',
					userId: this.$store.state.userId,
					orderId: 1,
				},
				payType: 1,
				orderInfo: {}
			};
		},
		computed: {
		
		},
		onLoad(options) {
			console.log(options)
			this.data = JSON.parse(options.data)
			this.loadData();
		},

		methods: {
			
			async loadData(userId){
				let user = await this.$http('/user/find',{id:this.data.userId});
				this.balance = user.balance;
			},
			
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			async confirm() {
				if(this.data.money > this.balance){
					this.$api.msg('可用余额不足');
				}else{
					await this.$http('/order/pay',this.data);
					uni.redirectTo({
						url: '/pages/money/paySuccess'
					})
				}
				
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
			width: 100upx;
			font-size: 52upx;
		}
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
		.icon-weixinzhifu {
			color: #36cb59;
		}
		.icon-alipay {
			color: #01aaef;
		}
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

</style>
