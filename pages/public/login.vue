<template>
	<view class="content">
		<view class="logo"><image src="/static/missing-face.png" mode=""></image></view>
		<view class="uni-form-item uni-column">
			<input type="tel" class="uni-input" v-model="mobile" name="" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<input type="password" class="uni-input" v-model="password" name="" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="toLogin">登陆</button>
		<view class="links">
			<view @tap="gotoForgetPassword">忘记密码？</view>
			<view>|</view>
			<view class="link-highlight" @tap="gotoRegistration">注册账号</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex';
	
	export default {
		data() {
			return {
				mobile: '18670041806',
				password: '',
				logining: false
			}
		},
		onLoad() {
			
		},
		methods: {
			...mapMutations(['login']),
			
			gotoRegistration: function () {
				uni.navigateTo({url: '/pages/public/registration'});
			},
			gotoForgetPassword: function () {
				uni.navigateTo({url: 'forget-password'});
			},
			navBack(){
				uni.navigateBack();
			},
			async toLogin(){
				if(this.mobile != '' && this.password != ''){
					let userInfo = await this.$http('/register/selectEmply',{mantele:this.mobile,password:this.password},'POST');
					console.log('登陆信息：' + userInfo);
					this.login(userInfo);
					uni.navigateBack();
				}else{
					this.$api.msg('请输入账号密码');
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 100upx;
	}
	.logo{
		margin-top: 70px;
		margin-bottom: 50px;
	  text-align: center;
		image{
		    height: 200upx;
		    width: 200upx;
		    margin: 0 0 60upx;
		}
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			height: 50upx;
			font-size: 30upx;
			padding: 5upx 0;
		}
	}
	button[type="primary"]{
		background-color: $uni-color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $uni-color-primary
		}
	}
</style>
