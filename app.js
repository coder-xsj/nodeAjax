// 引入express框架
const express = require('express');
// 路径处理
const path = require('path');
// 创建web服务器
const app = express();
// 为了获取post参数
const bodyParser = require('body-parser');
// 读取文件
const fs = require('fs');
// 解析FormData对象
const formidable = require('formidable');
// 实现服务器向第三方服务器发送请求
var request = require('request');
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser()); //不然不会解析String参数
app.use(bodyParser.json());


// 设置模板引擎和视图位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// 对应01-ajax
app.get('/first', (req, res) => {
  // res.send('Hello Ajax');
  res.send({'name': 'xsj'});
});
// 对应03-传递get参数
app.get('/get', (req, res) => {
    res.send(req.query);
});

// 对应04-传递post参数
app.post('/post', (req, res) => {
    // res.send(req.body) //req.body获取post提交的数据
    res.send(req.body) //req.body获取post提交的数据
});

// 对应05-传递post参数json格式
app.post('/json', (req, res) => {
    res.send(req.body);
});

// 06-onreadystate事件
app.get('/readystate', (req, res) => {
    res.send("hello readyState");
});
// 07-处理error错误
app.get('/error', (req, res) => {
    //打印一个不存在的变量 自动返回500 服务器错误
    // console.log(exist);
    // 设置响应码为400
   res.status(400).send('server not found!');
});

app.get('/cache', (req, res) => {
    fs.readFile('./cache.txt', (err, result) => {
        res.send(result);
    })
});

// 002-验证邮箱唯一性.html
app.get('/verifyEmailAddress', (req, res) => {
    var data = req.query;
    // 模拟数据库查询
    if(data.email == 'coder-xsj@qq.com'){
        res.send({
            status: 0,
            message: '抱歉，邮箱：' + data.email + '已经被使用',
        })
    }else {
        res.send({
            status: 1,
            message: '恭喜你，邮箱：' + data.email + '可以使用',
        })
    }
});

app.get('/serchTip', (req, res) => {
    var words = req.query;
    var serchTips = [
        'ajax百度一下',
        'ajax请求的五个步骤|面采购',
        'ajax同步和异步的区别',
        'ajax面试题',
        'ajax请求',
        'ajax异步',
        'ajax和json',
        'ajax error',
        'ajax同步',
        'ajax请求实例',
        'ajax异步请求',
    ];
    var tips = [];
    serchTips.forEach(function (value, index, array) {
        if(value.indexOf(words.serchWords) != -1){
            var tip = {};
            tip.msg = value;
            tip.id = index;
        }
        //判断是否为空对象
        tips.push(tip);
    });
    tips.push({msg: "未找到提示内容"});
    Object.assign({}, tips);
    res.send(tips);
});

// 对应 005-FormData对象使用
app.post('/formData', (req, res) => {
    // 创建formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 解析客户端传递过来的FormData对象
    form.parse(req, (err, fields, files) => {
        res.send(fields);
    });

});

// 对应 007-FormData对象实现二进制传输
app.post('/upload', (req, res) => {
    // 创建formida表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传的存储路径
    form.uploadDir = path.join(__dirname, 'public', 'uploads');
    // 保留上传文件的后缀名, 默认false
    form.keepExtensions = true;
    form.parse(req, (err, fileds, files) => {
        res.send({
            msg: 'upload status: ok!',
            status: 1,
            // path是绝对路径，用split分割，以第一个参数划分然后左右两个数组
            path: files.fileName.path.split('public')[1],
        });
    })
});

app.get('/server', (req, res) => {
    //  服务器是不受同源政策影响的，所以
    // 利用服务器向第三方服务器发送请求
    request('http://localhost:3001/cross', (err, response, body) => {
        res.send(body);
    })
});

// jQuery-ajax方法
app.get('/jQueryAjax', (req, res) => {
    res.send(req.query);
})
// jQuery-ajax方法
app.post('/jQueryAjax', (req, res) => {
    res.send(req.body);
})

// app.listen(3010);
console.log("服务器启动成功");

module.exports = app;