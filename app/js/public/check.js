module.exports ={
	carNumCheck:function(str){//车牌号验证
       return /(^[\u4E00-\u9FA5]{1}[A-Za-z0-9]{6}$)|(^[A-Za-z]{2}[A-Za-z0-9]{2}[A-Za-z0-9\u4E00-\u9FA5]{1}[A-Za-z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Za-z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Za-z]{2}[0-9]{5}$)|(^(08|38){1}[A-Za-z0-9]{4}[A-Za-z0-9挂学警军港澳]{1}$)/.test(str);

	},
	phoneNumCheck:function(str){//手机号码验证
		//return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(str);
		return /^1\d{10}$/.test(str);

	},
	trim:function(str){//字符串去空格
		 return str.replace(/(^\s*)|(\s*$)/g, "");
	}
};