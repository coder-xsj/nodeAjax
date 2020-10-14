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
// 引入mongodb
var MongoClient = require('mongodb').MongoClient;
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser()); //不然不会解析String参数
app.use(bodyParser.json());
// 利用中间件来达到拦截的请求策略


// 设置模板引擎和视图位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// 导入todo路由案例
const todoRouter = require('./routes/todo')
// 当客户端的请求路径以/todo开头时
app.use('/todo', todoRouter);














// var url = "mongodb://coder-xsj:123456@localhost:27017/todo";

// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close();
// });



// app.get('/todo/task', (req, res) => {
//     var dbo = db.db("todo");
//     var whereStr = {"completed": false};  // 查询条件
//     dbo.collection("todo").find(whereStr).toArray(function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         // console.log(result);
//         db.close();
//     });
// })


console.log("服务器启动成功");

module.exports = app;