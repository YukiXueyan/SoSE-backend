const express = require("express");　　// 引入express模块
const route = express();
const mysql = require('mysql'); // 引入mysql模块


let con = mysql.createConnection({ // 配置mysql数据库
    host: 'localhost',　　// 主机名
    port: '3306',　　// 默认端口
    user: 'root',　　// 连接的名字
    password: '123456',　　// 连接的密码
    database: 'node'　　// 连接的数据库
});

con.connect(); // 与数据库建立连接

//查询数据
route.get('/select', function(req, res) {
    var sql = 'select * from user'; //sql查询语句：查找user表中所有数据
    con.query(sql, function(err, result) { //连接数据库 传入sql语句 回调函数得到结果
        try {
            res.send(result) //查询结果响应给请求方
        } catch (err) {
            console.log("查询失败");
        }
    });
})
//增加数据
route.post('/add', function(req, res) {
    var sql = 'insert into user set  uname=? , uage=?'; // 这边的"?"是SQL的模板语法
    var params = [req.query.uname, req.query.uage]  // 这边的数组参数与上边的"?"一一映射
    con.query(sql, params, function(err, result) {
        try {
            res.send('增加数据成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
})
module.exports = route;
