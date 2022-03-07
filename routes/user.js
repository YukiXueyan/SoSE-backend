const express = require("express");　　// 引入express模块
const route = express();
const con = require("./database");

//获取用户已解锁的模式
route.get('/mode/list', function(req, res) {
    var sql = 'select * from user_mode where userId = ?';
    var params = [req.query.userId]
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方

        } catch (err) {
            console.log("查询失败");
        }
    });
})

//获取用户信息
route.get('/info', function(req, res) {
    var sql = 'select * from user where id = ?';
    var params = [req.query.userId]
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方

        } catch (err) {
            console.log("查询失败");
        }
    });
})

//修改用户当前关卡进度
route.put('/over', function(req, res) {
    var sql = 'update user set chapterId=?, checkpoint =? where id=?';
    var params = [req.query.chapterId, req.query.checkpoint, req.query.userId]
    con.query(sql, params, function(err) {
        try {
            res.send('修改数据成功');
        } catch (err) {
            console.log('修改数据失败');
        }
    });
})
//获取用户成就列表
route.get('/achieve', function(req, res) {
    var sql = `
    SELECT * FROM (
        select * from user_achieve where userId = ?
    ) as a right join achieve on a.achieveId = achieve.id`;
    var params = [req.query.userId]
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方

        } catch (err) {
            console.log("查询失败");
        }
    });
})
//增加用户积分
route.post('/addPoint', function(req, res) {
    var sql = `
    update user set point=? where id=?
    `;
    var params = [req.query.point, req.query.userId]
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方

        } catch (err) {
            console.log("err",err);
        }
    });
})

module.exports = route;
