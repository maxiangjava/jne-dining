<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in menuList" :key="item.id" class="f-item b-b" :class="{active: item.menuId === currentId}" @click="tabtap(item)">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in foodList" :key="item.id" class="s-list" :id="'main-'+item.id">
				<view class="food-item">
					<view @click="navTo(item.foodId,item.img)">
						<image style="width: 90px;height: 90px;margin-right: 5px;margin-top: 4px;" :src="item.img"></image>
					</view>
					<view >
						<view style="font-size: 28upx;margin: 2px 0;height: 20px;" @click="navTo(item.foodId,item.img)">{{item.title}}</view>
						<view style="margin: 2px 0;height: 35px" @click="navTo(item.foodId,item.img)">{{item.describe}}</view>
						<view style="display: flex;height: 35px;">
							<view @click="navTo(item.foodId,item.img)">
								<view>已售{{item.sale}}份，库存{{item.inventory}}份</view>
								<text style="color: #fa436a;font-size: 26upx;">¥{{item.price.toFixed(2)}}</text>
								<text class="m-price">¥{{item.originalPrice.toFixed(2)}}</text>
							</view>
							<view @click="addCart(item.foodId)">
								<text class="yticon icon-jia1 add-cart" ></text>
							</view>
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
				sizeCalcState: false,
				tabScrollTop: 0,
				menuId:0,
				currentId: 1,
				menuList: [],
				list: [],
			}
		},
		onLoad(){
			this.loadData();
		},
		computed:{
			foodList(){
				let id = this.menuId;
				if(id == 0 && this.menuList.length > 0){
					id = this.menuList[0].menuId;
					this.currentId = id
				}
				console.log('菜单Id：' + id)
				return this.list[id]
			}
		},
		methods: {
			async loadData(){
				this.menuList = await this.$http('/menu/list');
				this.list = await this.$http('/food/list');
				console.log(this.list)
			},
			
			//添加购物车
			async addCart(foodId){
				console.log('添加购物车：' + foodId)
				let res = await this.$http('/cart/add',{foodId,userId:sessionStorage.getItem('userId')});
				this.$api.msg(res);
			},
			//查看详情
			navTo(foodId,img){
				uni.navigateTo({url:'/pages/product/product?foodId=' + foodId})  
			}, 
			
			
			//一级分类点击
			async tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.menuId = item.menuId;
				this.currentId = item.menuId;
				this.$store.commit('setMenuId',item.menuId)
				
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.sizeCalcState = true;
			},
			
		},
		onShow(){
			if(this.$store.state.menuId != 0){
				this.menuId = this.$store.state.menuId;
				this.currentId = this.menuId
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

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>
