import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userId: '',
		token: '',
		menuId:0
	},
	mutations: {
		login(state, provider) {
			console.log('开始登陆',provider)
			state.hasLogin = true;
			state.userId = provider.emplyId;
			state.token = provider.token;
			uni.setStorageSync('hasLogin', true);
			uni.setStorageSync('userId', provider.emplyId);
			uni.setStorageSync('token', provider.token);
		},
		logout(state) {
			state.hasLogin = false;
			state.userId = '';
			state.userInfo = {};
			uni.clearStorage();
		},
		setMenuId(state,menuId) {
			state.menuId = menuId;
		}
	},
	actions: {
	
	}
})

export default store
