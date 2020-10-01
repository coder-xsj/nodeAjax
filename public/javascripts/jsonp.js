function jsonp(options){
    var funName = 'jsonp' + Math.random().toString().replace('.', '');
    window[funName] = options.success;
    // 通过options.data来访问参数,拼接字符串为key1=value1&key2=value2
    var params = '';
    for (const attr in options.data) {
        params += '&' + attr + '=' + options.data[attr];
    }

    // 动态创建script方法
    var script = document.createElement('script');
    // 设置src属性, 交由这里处理
    script.src = options.url + '?callback=' + funName + params;
    // 追加到页面中
    document.body.appendChild(script);
    // 加载完就删除掉
    script.onload = function () {
        document.body.removeChild(script);
    }
}