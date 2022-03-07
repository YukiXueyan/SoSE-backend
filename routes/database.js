const express = require("express");　　// 引入express模块
// const route = express();
const mysql = require('mysql'); // 引入mysql模块


let con = mysql.createConnection({ // 配置mysql数据库
    host: 'localhost',　　// 主机名
    port: '3306',　　// 默认端口
    user: 'root',　　// 连接的名字
    password: '123456',　　// 连接的密码
    database: 'software_engineering_game'　　// 连接的数据库
});

con.connect(); // 与数据库建立连接


module.exports = con;
