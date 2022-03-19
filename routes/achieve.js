const express = require("express");　　// 引入express模块
const route = express();
// const mysql = require('mysql'); // 引入mysql模块
const con = require("./database");
// const moment = require("moment");

/**
 * 成就系统
 */

//获取用户成就列表,包括未完成的成就
route.get('/list', function(req, res) {
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

/**
 * 添加用户成就
 */


route.post('/add', function(req, res) {
  var sql = 'insert into user_achieve set  userId=? , achieveId=?'; 
  var params = [req.query.userId, req.query.achieveId]  
  con.query(sql, params, function(err, result) {
      try {
          res.send('增加数据成功');
      } catch (err) {
          console.log('新增数据失败');
      }
  });
})

module.exports = route;
