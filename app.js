// 引入express框架
const express = require('express');
// 路径处理
const path = require('path');
// 创建web服务器
const app = express();

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

// 设置模板引擎和视图位置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.get('/first', (req, res) => {
  // res.send('Hello Ajax');
  res.send({'name': 'xsj'});
});

app.get('/get', ((req, res) => {
    res.send(req.query);

}))



// app.listen(3000);
console.log("服务器启动成功");

module.exports = app;