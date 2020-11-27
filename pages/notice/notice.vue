<template>
	<view>
		<view class="notice-item" v-for="item in noticeList" :key="item.payId">
			<text class="time">{{item.createTime | formatTime}}</text>
			<view class="content">
				<text class="title">{{item.payType}}</text>
				<text class="introduce">
					从 {{item.payChannel}} 消费了 {{item.money}} 元。
				</text>
				<view class="bot b-t" @click="lookDetail(item.orderId)">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noticeList:[]
			}
		},
		onLoad(){
			this.loadData()
		},
		methods: {
			//请求数据
			async loadData(){
				this.noticeList = await this.$http('/payHistory/list',{userId:sessionStorage.getItem('userId')});
				console.log(this.noticeList)
			},
			//查看详情
			lookDetail(orderId){
				if(orderId != null){
					uni.navigateTo({url:'/pages/order/OrderDetail?orderId=' + orderId})  
				}
				
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		margin-left: 20px;
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
