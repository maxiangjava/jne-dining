<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.img" class="loaded" mode="aspectFill" lazy-load></image>
							<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" @click="check('item', index)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.title}}</text>
							<text class="attr">{{item.describe}}</text>
							<view>
								<text class="price">¥{{item.price.toFixed(2)}}</text>
								<uni-number-box class="step" :min="1" :max="item.inventory"
									:value="item.sum>item.stock?item.stock:item.sum"
									:isMax="item.sum>=item.stock?true:false"
									:isMin="item.sum===1" :index="index" @eventChange="numberChange">
								</uni-number-box>
							</view>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(item.id)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn show" @click="clearCart">清空</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total}}</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				userId:this.$store.state.userId,
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
			};
		},
		onLoad(){
			
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			hasLogin(){
				return this.$store.state.hasLogin
			},
			total(){
				let total = 0;
				this.cartList.forEach(item=>{
					if(item.checked){
						total += item.price * item.sum;
					}
				})
				return total.toFixed(2)
			}
		},
		methods: {
			//请求数据
			async loadData(){
				this.cartList = await this.$http('/cart/list',{userId:this.userId});
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			check(type, index){
				if(type === 'item'){
					this.cartList[index].checked = !this.cartList[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
			},
			//数量改变时触发
			async numberChange(data){
				this.cartList[data.index].sum = data.number;
				let cart = this.cartList[data.index];
				await this.$http('/cart/updateSum',{foodId:cart.foodId,sum:cart.sum},'POST');
			},
			//删除
			async deleteCartItem(id){
				console.log('删除' + id)
				await this.$http('/cart/del',{id});
				window.location.reload()
			},
			//清空
			clearCart(){
				uni.showModal({
					title: '提示',
					content: '是否确认清空购物车',
					success: async (res) => {
						if (res.confirm) {
							await this.$http('/cart/remove',{userId:this.userId});
							window.location.reload()
						}
					}
				});
			},
			
			//创建订单
			async createOrder(){
				console.log('开始创建订单')
				let orderId = await this.$http('/order/add',{
					userId:this.userId,
					amount:this.total,
					detail:this.cartList.filter(item=>{return item.checked})
				},'POST');
				console.log('创建的订单编号' + orderId)
				uni.navigateTo({
					url: '/pages/order/createOrder?orderId=' + orderId
				})
				this.$api.msg('跳转下一页 sendData');
			}
		},
		onShow(){
			console.log('页面显示')
			if(this.hasLogin){
				this.loadData()
			}
		},
		onHide(){
			console.log('页面隐藏')
			this.cartList = []
		}
	}
</script>

<style lang='scss'>
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			position:fixed;
			left: 0;
			top:0;
			width: 100%;
			height: 100vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 50upx;
				line-height: 50upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 120upx;
				line-height: 40upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
				color: red;
			}
			.step{
				height: 54upx;
				border: 1px solid #c7cbd3;
				
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:140upx;
		/* #endif */
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
	
	
</style>
