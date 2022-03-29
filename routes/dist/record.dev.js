"use strict";

var express = require("express"); // 引入express模块


var route = express(); // const mysql = require('mysql'); // 引入mysql模块

var con = require("./database"); // const moment = require("moment");
//获取记录列表


route.get('/', function (req, res) {
  // const pageNum = req.query.pageNum || 0  //当前的num
  // const pageSize = req.query.pageSize || 10;  //当前页的数量
  var userId = req.query.userId;
  var modeId = req.query.modeId;
  var params = [userId, modeId];
  var sql = modeId ? 'select * from record where userId = ?and modeId=?' : 'select * from record where userId = ?'; // var sql = 'select * from record where userId = ? limit ?,?';

  con.query(sql, params, function (err, result) {
    try {
      res.send(result); //查询结果响应给请求方
    } catch (err) {
      console.log("查询失败", err);
    }
  });
});
module.exports = route;