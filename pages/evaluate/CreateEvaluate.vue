<template>
    <view class="ce-content">
		<view class="ce-item" v-for="item in foodList" :key="item.foodId" >
			<view class="ce-item-img">
				<view>
					<image style="width: 80px;height: 80px;" :src="item.img" mode=""></image>
				</view>
				<view style="margin-left: 10px;margin: auto 5px;">
					<view>{{item.title}}</view>
					<view>价格：<text style="color: red;">￥{{item.price}}</text></view>
					<view>数量：{{item.num}} 份</view>
				</view>
			</view>
			<view class="r-top">
				<textarea style="height: 100px;" maxlength="100" placeholder-style="color:rgba(153,153,153,1);" v-model="item.evaluate" placeholder="请输入" />
				<view class="r-top-t">
				 	<view></view>
					<view>{{item.evaluate ? item.evaluate.length : 0}}/120字</view>
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
				orderId:'',
                orderInfo: {},
				foodList:[],
				content:''
            }
        },
		computed:{
			
		},
		onLoad(options){
			this.orderId = options.orderId;
			console.log(this.orderId);
			this.loadData();
		},
		methods:{
			async issue(){
				let list = this.foodList
				let orderId = this.orderId
				let userId = sessionStorage.getItem('userId');
				await this.$http('/evaluate/issue',{userId,orderId,list},'POST');
				uni.navigateBack();
			},
			async loadData(){
				this.orderInfo = await this.$http('/order/info',{orderId:this.orderId});
				this.foodList = this.orderInfo.orderDetailList 
				console.log(this.orderInfo);
			},
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
			bottom: 16upx;
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
