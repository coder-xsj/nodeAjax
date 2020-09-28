// 封装一个ajax函数 只接受类型为get和post
function ajax(options) {
    // 设置一个defaults对象，里面存放默认值
    var defaults = {
        type: 'get',
        url: '',
        data: '',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: function () {},
        error: function () {},
    };

    // 将options对象覆盖defaults对象
    // 这会影响到原对象, 所以不需要接收
    Object.assign(defaults, options);

    var xhr = new XMLHttpRequest();
    // 拼接参数, 将json转化成字符串格式
    var params = '';
    for (var attr in defaults.data){
        params += attr + '=' + defaults.data[attr] + '&';
    }
    // 去掉末尾的&符号
    params = params.substring(0, params.length - 1);
    // 拼接url
    if(defaults.type == 'get'){
        defaults.url = defaults.url + '?' + params;
    }
    // 建立连接
    xhr.open(defaults.type, defaults.url);

    if (defaults.type == 'post'){
        // 拿到请求头类型
        var contentType = defaults.header['Content-Type'];
        // 设置类型
        xhr.setRequestHeader('Content-Type', contentType);
        // 选择发送数据格式
        if(contentType == 'application/json'){
            xhr.send(JSON.stringify(defaults.data));
        }else {
            xhr.send(params);
        }

    }else {
        xhr.send();
    }
    // 当xhr对象接受完响应数据后触发
    xhr.onload = function () {
        if (xhr.status == 200){
            // 获取响应头中的数据
            var responseText = xhr.responseText;
            var contentType = xhr.getResponseHeader('Content-Type');
            // 如果响应内容中包含application/json
            if (contentType.indexOf('application/json') != -1){
                //将json字符串为json对象
                responseText = JSON.parse(responseText);
            }
            // console.log(xhr.responseText);
            // 请求成功调用success函数
            defaults.success(responseText, xhr);
        }else {
            // 请求失败调用error函数，返回xhr对象是为了给error函数更多的信息
            defaults.error(responseText, xhr);
        }

    }

}