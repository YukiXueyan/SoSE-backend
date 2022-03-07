const express = require("express");　　// 引入express模块
const route = express();
// const mysql = require('mysql'); // 引入mysql模块
const con = require("./database");
const moment = require("moment");

//获取题目列表
route.get('/list', function(req, res) {
    const pageNum = req.query.pageNum  //当前的num
    const pageSize = req.query.pageSize  //当前页的数量
    const chapterID = req.query.chapterID;
    const params = [chapterID,(parseInt(pageNum) - 1) * parseInt(pageSize), parseInt(pageSize)]

    var sql = 'select * from question where chapterID = ? limit ?,?';
    // var sql = 'select * from question where chapterID = ?, limit ?';
    con.query(sql, params, function(err, result) { 
        try {
            res.send(result) //查询结果响应给请求方

        } catch (err) {
            console.log("查询失败");
        }
    });
})

//完成答题
route.post('/success', function(req, res) {
    const userID = req.query.userID;
    const modeId = req.query.modeId;
    const grade = req.query.grade;
    const number = req.query.number;
    let time = Date();
    time = moment(time).valueOf();
    const playTime = req.query.playTime;
    var sql = `insert into record set userID=?,modeId=?,grade=?,number=?,time=?,playTime=?`; 
    var params = [userID,modeId,grade,number,time,playTime]  // 这边的数组参数与上边的"?"一一映射
    con.query(sql, params, function(err, result) {
        try {
            res.send('增加数据成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
})


module.exports = route;
