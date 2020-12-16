

let baseURL='http://106.52.114.45:8888';
// let baseURL='http://localhost:8888';
var http = '';

// 传参：methods请求方法，params参数，urls接口，isFormData参数格式是否FormData，header请求头
http = async function(url, data,method) {
	if(data){
		data.token = localStorage.getItem("token");
	}
	let resp = {};
	if('POST' == method){
		resp = await uni.request({url:baseURL + url,data,method})
	}else{
		resp = await uni.request({url:baseURL + url,data})
	}
	if(200 == resp[1].statusCode){
		return resp[1].data
	}else{
		return 'err'
	}
}

export default http

