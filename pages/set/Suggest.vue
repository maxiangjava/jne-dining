<template>
	<view class="ce-content">
	<view class="ce-item">
		<view class="r-top">
			<textarea style="height: 100px;" maxlength="100" placeholder-style="color:rgba(153,153,153,1);" v-model="suggest" placeholder="请输入" />
			<view class="r-top-t">
				<view></view>
				<view>{{suggest.length}}/120字</view>
			 </view>
		</view>
	</view>
			<button class="add-btn" @click="issue()">发布</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				suggest:''
			}
		},
		methods:{
			async issue(){
				let userId = sessionStorage.getItem('userId');
				// await this.$http('/set/issue',{userId,suggest:this.suggest},'POST');
				this.$api.msg('感谢您的反馈！');
				uni.navigateBack();
			}
		}
  }
</script>

<style lang="scss">
	
	.ce-content{
		width: 100vw;
		.ce-item{
			margin: 10px;
			.ce-item-img{
				display: flex;
			}
			.r-top{
				padding: 10rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				border: 1px solid #C0C4CC;
			}
			.r-top-t{
				display: flex;
				justify-content: space-between;
				font-family:PingFang SC;
				font-weight:400;
				line-height:20px;
				color:rgba(153,153,153,1);
				opacity:1;
			}
		}
		
		.add-btn{
			position: fixed;
			left: 30upx;
			right: 30upx;
			z-index: 95;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 690upx;
			height: 80upx;
			font-size: 32upx;
			color: #fff;
			background-color: $base-color;
			border-radius: 10upx;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
		}
		
	}
	

    
</style>
