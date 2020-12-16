<template>
	<view class="content">
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in foodList" :key="item.id" class="s-list" :id="'main-'+item.id">
				<view class="food-item">
					<view>
						<image style="width: 90px;height: 90px;margin-right: 5px;margin-top: 4px;" :src="item.img"></image>
					</view>
					<view >
						<view style="font-size: 28upx;margin: 2px 0;height: 20px;" @click="navTo(item.foodId,item.img)">{{item.title}}</view>
						<view style="margin: 2px 0;height: 35px" @click="navTo(item.foodId,item.img)">{{item.describe}}</view>
						<view style="height: 35px;">
							<view>已售{{item.sale}}份，库存{{item.inventory}}份</view>
							<view>
								<text style="color: #fa436a;font-size: 26upx;">¥{{item.price.toFixed(2)}}</text>
								<text class="m-price">¥{{item.originalPrice.toFixed(2)}}</text>
							</view>
						</view>
					</view>
					<view style="width: 40px;text-align: center;">
						<view style="padding: 5px;" @click="del(item.favoriteId)">
							<text style="font-size: 20px;" class="yticon icon-fork"></text>
						</view>
						<view style="padding: 5px;margin-top: 25px;" @click="addCart(item.foodId)">
							<text style="font-size: 20px;" class="yticon icon-jia1" ></text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:this.$store.state.userId,
				sizeCalcState: false,
				tabScrollTop: 0,
				menuId:0,
				currentId: 1,
				foodList: [],
				list: [],
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			async loadData(){
				this.foodList = await this.$http('/favorite/list',{userId:this.userId});
				console.log(this.foodList)
			},
			
			//添加购物车
			async addCart(foodId){
				console.log('添加购物车：' + foodId)
				let res = await this.$http('/cart/add',{foodId,userId:this.userId});
				this.$api.msg(res);
			},
			
			async del(favoriteId){
				await this.$http('/favorite/del',{favoriteId});
				this.loadData();
			},
			
			//点击导航栏 buttons 时触发
			onNavigationBarButtonTap(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认清空收藏',
					success: async (res) => {
						if (res.confirm) {
							await this.$http('/favorite/remove',{userId:this.userId});
							this.loadData();
						}
					}
				});
			}
			
			
		}	
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}
	
	
	.food-item{
		display: flex;
		background-color: #fff;
		margin-top: 5px;
		color: $font-color-base;
		font-size: 22upx;
	}
	
	.add-cart{
		font-size: 20px;
		padding: 6px;
		position: absolute;
		right: 8px;
	}
	
	.m-price{
		margin:0 10upx;
		color: $font-color-light;
		text-decoration: line-through;
	}

	.right-aside{
		overflow: hidden;
		padding-left: 20upx;
	}
	
</style>
