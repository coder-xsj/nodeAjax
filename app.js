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
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser());
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
})

// app.listen(3000);
console.log("服务器启动成功");

module.exports = app;