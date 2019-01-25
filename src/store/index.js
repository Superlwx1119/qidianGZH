import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		level:window.sessionStorage.getItem('level'),
		code:'',
		productId:window.sessionStorage.getItem('productId'),
		registrationId:window.sessionStorage.getItem('registrationId'),
		up1:false,
		up2:false,
	},
	actions:{
		changeLevel(val,level){
			val.commit('changeLevel',level)
		},
		getCode(val,code){
			val.commit('getCode',code)
		},
		getProductId(val,productId){
			val.commit('getProductId',productId)
		},
		getRegistrationId(val,registrationId){
			val.commit('getRegistrationId',registrationId)
		},
		getUp1(val,up1){
			val.commit('getUp1',up1)
		},
		getUp2(val,up2){
			val.commit('getUp2',up2)
		},
	},
	mutations:{
		changeLevel(state,level){
			state.level=level
			window.sessionStorage.setItem('level', level);
		},
		getCode(state,code){
			state.code=code
			window.sessionStorage.setItem('code', code);
		},
		getProductId(state,productId){
			state.productId=productId
			window.sessionStorage.setItem('productId', productId);
		},
		getRegistrationId(state,registrationId){
			state.registrationId=registrationId
			window.sessionStorage.setItem('registrationId', registrationId);
		},
		getUp1(state,up1){
			state.up1=!up1
			window.sessionStorage.setItem('up1', !up1);
		},
		getUp2(state,up2){
			state.up2=!up2
			window.sessionStorage.setItem('up2', !up2);
		},
	}
})
