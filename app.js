// 引入express框架
const express = require('express');
// 路径处理
const path = require('path');
// 创建web服务器
const app = express();
// 为了获取post参数
const bodyParser = require('body-parser');
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
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



// app.listen(3000);
console.log("服务器启动成功");

module.exports = app;