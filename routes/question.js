const express = require("express");　　// 引入express模块
const route = express();
// const mysql = require('mysql'); // 引入mysql模块
const con = require("./database");
const data = require("./data");
const moment = require("moment");

//获取题目列表
route.get('/list', function (req, res) {
    const pageNum = req.query.pageNum  //当前的num
    const pageSize = req.query.pageSize  //当前页的数量
    const chapterId = req.query.chapterId;
    const params = chapterId?[chapterId, (parseInt(pageNum)) * parseInt(pageSize), parseInt(pageSize)]:[(parseInt(pageNum)) * parseInt(pageSize), parseInt(pageSize)]

    var sql = chapterId?'select * from question where chapterId = ?order by rand() limit ?,? ':'select * from question order by rand() limit ?,? ';
    // var sql = 'select * from question';
    con.query(sql, params, function (err, result) {
        try {
            const res2 = result.map(item => {
                return {
                    question: item.question,
                    currentAnswer: item.currentAnswer,
                    chapterId:item.chapterId,
                    options: JSON.parse(item.options),
                    type: item.type,
                    id:item.id
                }
            })

            res.send(res2) //查询结果响应给请求方

        } catch (err) {
            console.log(err);
        }
    });
})


//添加题目
route.post('/add', function (req, res) {
    data.map(item => {

        var optList = JSON.stringify(item.options)
        var params = [item.question, item.currentAnswer, item.chapterId,item.type]  // 判断
        // var params = [item.question, item.currentAnswer, item.chapterId,item.type,optList]  //单选题

        var sql = 'insert into question set  question=? , currentAnswer=?, chapterId=?, type=?';// 判断
        // var sql = 'insert into question set  question=? , currentAnswer=?, chapterId=?, type=?,options=?';//单选题
        con.query(sql, params, function (err, result) {
            try {
                res.send(result) //查询结果响应给请求方
            } catch (err) {
                console.log("查询失败");
            }
        });

    })
    // res.send('add function ') //查询结果响应给请求方
})

route.post('/add2', function (req, res) {
    const jsonData = JSON.stringify(data[1].options);
    const params = [jsonData]
    var sql = 'update question set options=? where id = 2';
    con.query(sql, params, function (err, result) {
        try {
            res.send('result') //查询结果响应给请求方
        } catch (err) {
            console.log("查询失败");
        }
    });
})

//完成答题
route.post('/success', function (req, res) {
    const userId = req.query.userId;
    const modeId = req.query.modeId;
    const grade = req.query.grade;
    const number = req.query.number;
    let time = moment(Date()).valueOf();
    // const playTime = req.query.playTime;
    var sql = `insert into record set userId=?,modeId=?,grade=?,number=?,time=?`;
    var params = [userId, modeId, grade, number, time]  // 这边的数组参数与上边的"?"一一映射
    con.query(sql, params, function (err, result) {
        try {
            res.send('增加数据成功');
        } catch (err) {
            console.log('新增数据失败');
        }
    });
})


module.exports = route;
