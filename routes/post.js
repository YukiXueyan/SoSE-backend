const express = require("express");
const route = express();
// const route = express().Router();

route.get("/", (req, res) => {
    res.send({
      id: 1,
      title: "express 入门教程",
    });
  });
  route.get("/aaa", (req, res) => {
    res.send({
      id: 1,
      title: "express 入门教程",
    });
  });

  route.get("/list", (req, res) => {
    res.send([
      {
        id: 1,
        title: "express 入门教程",
      },
      {
        id: 2,
        title: "express 入门教程2",
      },
      {
        id: 3,
        title: "express 入门教程3",
      }
    ]);
  });
  route.get("/:id", (req, res) => {
    console.log("get收到请求参数，文章id 为：", req.params.id);
    console.log("get收到请求体，新的文章内容为：", req.body);
  
    // 更新数据库文章
  
    res.send({ id: req.params.id, ...req.body });
  });
  route.post("/", (req, res) => {
    console.log("保存文章：", req.body);
  
    // 保存文章到数据库
  
    res.status(201).send({ id: 2, ...req.body });
  });
  
  route.put("/:id", (req, res) => {
    console.log("收到请求参数，文章id 为：", req.params.id);
    console.log("收到请求体，新的文章内容为：", req.body);
  
    // 更新数据库文章
  
    res.send({ id: req.params.id, ...req.body });
  });
  
  route.delete("/:id", (req, res) => {
    console.log("收到请求参数，文章id 为：", req.params.id);
  
    // 删除数据库文章
  
    res.status(204).send();
  });


  module.exports = route;